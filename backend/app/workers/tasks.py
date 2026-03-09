from datetime import datetime, timezone
from sqlalchemy import create_engine, select, update
from sqlalchemy.orm import Session

from app.workers.celery_app import celery_app
from app.core.config import settings
from app.models.scheduled_notification import ScheduledNotification
from app.models.job_log import JobLog
from app.services.template_renderer import render_message
from app.workers.senders.whatsapp_twilio import send_whatsapp
from app.workers.senders.email_smtp import send_email

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

@celery_app.task(bind=True, max_retries=5, default_retry_delay=30)
def send_notification(self, notification_id: int):
    started = datetime.now(timezone.utc)
    with Session(engine) as db:
        notif = db.get(ScheduledNotification, notification_id)
        if not notif:
            return

        try:
            content = render_message(notif.template_key, notif.payload_json)

            # TODO: resolve destination (email/phone) from user table
            to_email = notif.payload_json.get("email", "dev@example.com")
            to_phone = notif.payload_json.get("phone", "+8801XXXXXXXXX")

            if notif.channel == "whatsapp":
                send_whatsapp(to_phone, content["text"])
            elif notif.channel == "email":
                send_email(to_email, content.get("subject", "Notification"), content["text"])
            else:
                # in-app notification: write to DB (not shown)
                pass

            notif.status = "SENT"
            notif.sent_at = datetime.now(timezone.utc)
            db.add(JobLog(
                job_type="send_notification",
                ref_table="scheduled_notifications",
                ref_id=notification_id,
                status="SUCCESS",
                finished_at=datetime.now(timezone.utc),
            ))
            db.commit()

        except Exception as e:
            notif.retry_count += 1
            notif.last_error = str(e)
            notif.status = "FAILED" if notif.retry_count >= 5 else "PENDING"
            db.add(JobLog(
                job_type="send_notification",
                ref_table="scheduled_notifications",
                ref_id=notification_id,
                status="FAIL",
                error=str(e),
                finished_at=datetime.now(timezone.utc),
            ))
            db.commit()

            if notif.retry_count < 5:
                raise self.retry(exc=e)
            raise

from app.models.planner import SyllabusData, StudyTask
from datetime import timedelta

@celery_app.task(bind=True)
def extract_syllabus_pdf(self, syllabus_id: int):
    """
    Mock Celery worker task that simulates ML-based PDF extraction.
    Generates dummy weekly tasks and exams from the document.
    """
    with Session(engine) as db:
        syllabus = db.get(SyllabusData, syllabus_id)
        if not syllabus:
            return
        
        try:
            # Simulated NLP processing block
            now = datetime.now(timezone.utc)
            tasks = [
                StudyTask(syllabus_id=syllabus.id, user_id=syllabus.user_id, title="Week 1 Reading: Intro", week_number=1, due_date=now + timedelta(days=7)),
                StudyTask(syllabus_id=syllabus.id, user_id=syllabus.user_id, title="Week 2 Assignment", week_number=2, due_date=now + timedelta(days=14)),
                StudyTask(syllabus_id=syllabus.id, user_id=syllabus.user_id, title="Midterm Exam Preparation", week_number=4, is_exam=True, due_date=now + timedelta(days=28)),
            ]
            db.add_all(tasks)
            syllabus.extraction_status = "COMPLETED"
            db.commit()
            
        except Exception as e:
            syllabus.extraction_status = "FAILED"
            db.commit()
            raise

from app.models.writing import WritingAnalysis
import random

@celery_app.task(bind=True)
def analyze_text_job(self, analysis_id: int):
    """
    Mock Celery worker for semantic NLP pipeline (Writing Helper).
    """
    with Session(engine) as db:
        analysis = db.get(WritingAnalysis, analysis_id)
        if not analysis:
            return
            
        try:
            # Simulate ML output
            analysis.similarity_score = round(random.uniform(2.5, 18.0), 2)
            analysis.suggestions = {
                "paraphrase": "Consider restructuring the paragraph containing your central claim to avoid passive voice.",
                "citations": [
                    {"type": "APA", "text": "Smith, J. (2020). The Study of Systems. Academic Press."}
                ],
                "evidence_map": "Claim A -> Source 1 link established."
            }
            analysis.status = "COMPLETED"
            db.commit()
        except Exception as e:
            analysis.status = "FAILED"
            db.commit()
            raise
