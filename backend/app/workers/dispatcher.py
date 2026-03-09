from datetime import datetime, timezone
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session

from app.workers.celery_app import celery_app
from app.core.config import settings
from app.workers.tasks import send_notification

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

@celery_app.task
def dispatch_due_notifications(limit: int = 50):
    """
    Atomically lock due notifications then enqueue send tasks.
    Uses SQL FOR UPDATE SKIP LOCKED to avoid double-sending across workers.
    """
    now = datetime.now(timezone.utc)

    with Session(engine) as db:
        rows = db.execute(text("""
            SELECT id
            FROM scheduled_notifications
            WHERE status = 'PENDING' AND send_at <= :now
            ORDER BY send_at ASC
            LIMIT :limit
            FOR UPDATE SKIP LOCKED
        """), {"now": now, "limit": limit}).fetchall()

        ids = [r[0] for r in rows]
        if not ids:
            return {"queued": 0}

        db.execute(text("""
            UPDATE scheduled_notifications
            SET status='LOCKED', locked_at=:now
            WHERE id = ANY(:ids)
        """), {"now": now, "ids": ids})
        db.commit()

    for nid in ids:
        send_notification.delay(nid)

    return {"queued": len(ids)}
