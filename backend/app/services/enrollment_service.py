from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.scheduled_notification import ScheduledNotification
from app.models.user import User
from app.models.course import Course
from app.models.section import Section
from app.models.enrollment import Enrollment
from app.models.payment import Payment

def resolve_user_id(db: Session, email: str, phone: str) -> int:
    # Lookup user by email, or create a new student
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, phone=phone, role="STUDENT")
        db.add(user)
        db.flush()
    return user.id

def get_upcoming_class_times_for_enrollment(db: Session, user_id: int):
    # Stub: query batches schedule for actual implementation later
    return []

def get_package_expiry(db: Session, user_id: int):
    # Stub: compute from enrollment/package
    from datetime import datetime, timezone, timedelta
    return datetime.now(timezone.utc) + timedelta(days=30)

def handle_paid_order(db: Session, payload: dict):
    """
    1) Find/create user
    2) Create payment row
    3) Assign batch (Stubbed for now, auto assigns first available section or creates one)
    4) Schedule notifications into scheduled_notifications
    """
    billing = payload.get("billing", {}) or {}
    student_phone = billing.get("phone", "")
    student_email = billing.get("email", "")
    order_id = payload.get("id")
    amount = float(payload.get("total", "0.0") or "0.0")

    if not student_email:
        # Cannot proceed without an email
        raise ValueError("Missing email in payload")

    user_id = resolve_user_id(db, student_email, student_phone)

    # Note payment
    payment = Payment(user_id=user_id, order_id=str(order_id), amount=amount)
    db.add(payment)

    # Demo logic: Automatically assign to the first active section
    # In a full system, you would check `line_items` to map product ID -> Course -> Section ID
    section = db.query(Section).first()
    if not section:
        # Create a dummy course and section for testing if none exist
        course = Course(title="Demo Course Integration", description="Auto-generated")
        db.add(course)
        db.flush()
        section = Section(course_id=course.id, title="Batch A", schedule_description="Tue/Thu default", zoom_link="https://zoom.us/j/demo123", capacity=30, enrolled_count=0)
        db.add(section)
        db.flush()

    if section.enrolled_count >= section.capacity:
        # Capacity logic -> Handle Waitlist (Stub)
        pass
    else:
        # Enroll
        try:
            enrollment = Enrollment(user_id=user_id, section_id=section.id)
            db.add(enrollment)
            section.enrolled_count += 1
            db.flush()
        except IntegrityError:
            # Already enrolled
            db.rollback()
            pass

    zoom_link = section.zoom_link
    class_title = f"{section.course.title if getattr(section, 'course', None) else 'Auto Course'} - {section.title}" if section else "Demo Class"

    now = datetime.now(timezone.utc)

    # Immediate: order confirmation (WhatsApp)
    db.add(ScheduledNotification(
        user_id=user_id,
        channel="whatsapp",
        template_key="order_confirm",
        payload_json={"order_id": order_id, "class_title": class_title, "phone": student_phone, "email": student_email},
        send_at=now + timedelta(seconds=5),
    ))

    # Immediate: Zoom link (WhatsApp)
    db.add(ScheduledNotification(
        user_id=user_id,
        channel="whatsapp",
        template_key="zoom_link",
        payload_json={"class_title": class_title, "zoom_link": zoom_link, "phone": student_phone, "email": student_email},
        send_at=now + timedelta(seconds=10),
    ))

    # Schedule reminders (e.g., next 8 classes, 30 minutes before)
    upcoming_class_times = get_upcoming_class_times_for_enrollment(db, user_id)
    for dt in upcoming_class_times:
        db.add(ScheduledNotification(
            user_id=user_id,
            channel="whatsapp",
            template_key="class_reminder",
            payload_json={"class_title": class_title, "start_time": dt.isoformat(), "phone": student_phone, "email": student_email},
            send_at=dt - timedelta(minutes=30),
        ))

    # Expiry warning
    expiry_date = get_package_expiry(db, user_id)
    for days_before in (7, 3, 1):
        db.add(ScheduledNotification(
            user_id=user_id,
            channel="whatsapp",
            template_key="expiry_warning",
            payload_json={"class_title": class_title, "expiry_date": expiry_date.date().isoformat(), "phone": student_phone, "email": student_email},
            send_at=expiry_date - timedelta(days=days_before),
        ))

    db.commit()
