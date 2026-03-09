from celery.schedules import crontab
from app.workers.celery_app import celery_app

celery_app.conf.beat_schedule = {
    "dispatch-due-notifications-every-minute": {
        "task": "app.workers.dispatcher.dispatch_due_notifications",
        "schedule": crontab(minute="*"),
    }
}
