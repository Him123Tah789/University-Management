from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List, Dict, Any
from datetime import datetime, timezone

from app.models.user import User
from app.models.course import Course
from app.models.section import Section
from app.models.enrollment import Enrollment
from app.models.prerequisite import CoursePrerequisite
from app.models.waitlist import Waitlist

def check_prerequisites(db: Session, user_id: int, course_id: int) -> bool:
    """Checks if user has fulfilled prerequisites for a specific course."""
    prereqs = db.query(CoursePrerequisite).filter(CoursePrerequisite.course_id == course_id).all()
    if not prereqs:
        return True
    
    # Check if the user has an enrollment for each prerequisite course
    # Assuming ANY past enrollment equates to having taken the prerequisite for the mock
    for prereq in prereqs:
        has_taken = db.query(Enrollment).join(Section).filter(
            Enrollment.user_id == user_id, 
            Section.course_id == prereq.prerequisite_course_id
        ).first()
        if not has_taken:
            return False
            
    return True

def check_time_conflicts(proposed_sections: List[Section]) -> bool:
    """Stub for conflict checking based on string descriptions."""
    # A real implementation would parse 'Mon/Wed 10:00-11:00' to datetime ranges
    schedules = set()
    for sec in proposed_sections:
        if sec.schedule_description:
            # Basic string overlap check for simulation
            if sec.schedule_description in schedules:
                return True
            schedules.add(sec.schedule_description)
    return False

def analyze_registration(db: Session, user_id: int, desired_course_ids: List[int]) -> Dict[str, Any]:
    """Provides seat availability, checks prereqs, and builds an optimal schedule."""
    warnings = []
    approved_sections = []
    waitlist_options = []
    
    for c_id in desired_course_ids:
        course = db.query(Course).filter(Course.id == c_id).first()
        if not course:
            warnings.append(f"Course {c_id} does not exist.")
            continue
            
        if not check_prerequisites(db, user_id, c_id):
            warnings.append(f"Prerequisite not met for {course.title}.")
            continue
            
        available_section = db.query(Section).filter(
            Section.course_id == c_id, 
            Section.enrolled_count < Section.capacity
        ).first()
        
        if available_section:
            approved_sections.append(available_section)
        else:
            warnings.append(f"No available seats for {course.title}.")
            waitlist_options.append(course.id)
            
    # Check for conflicts among the approved
    if check_time_conflicts(approved_sections):
        warnings.append("Time conflict detected in the proposed schedule.")
        # In a real engine, we'd backtrack and find alternative sections
        
    return {
        "schedule": [{"section_id": s.id, "course": s.title, "time": s.schedule_description} for s in approved_sections],
        "warnings": warnings,
        "waitlist_available_for_courses": waitlist_options
    }

def join_waitlist(db: Session, user_id: int, course_id: int):
    existing = db.query(Waitlist).filter(Waitlist.user_id == user_id, Waitlist.course_id == course_id).first()
    if not existing:
        db.add(Waitlist(user_id=user_id, course_id=course_id))
        db.commit()
    return True

from app.models.scheduled_notification import ScheduledNotification

def notify_waitlisted_students(db: Session, course_id: int, section_title: str):
    """Triggers when a new section opens or capacity increases. Notifies all waitlisted users."""
    waitlisted = db.query(Waitlist).filter(Waitlist.course_id == course_id).all()
    now = datetime.now(timezone.utc)
    for wait_req in waitlisted:
        user = db.query(User).filter(User.id == wait_req.user_id).first()
        if user:
            db.add(ScheduledNotification(
                user_id=user.id,
                channel="email",
                template_key="waitlist_opening",
                payload_json={"course_id": course_id, "section_title": section_title, "email": user.email, "phone": user.phone},
                send_at=now + timedelta(seconds=1)
            ))
            # Optional: remove from waitlist or keep until they enroll
            # db.delete(wait_req)
    db.commit()
