from app.core.db import engine, Base
import app.models.event_inbox  # noqa
import app.models.scheduled_notification  # noqa
import app.models.job_log  # noqa
import app.models.user  # noqa
import app.models.course  # noqa
import app.models.section  # noqa
import app.models.enrollment  # noqa
import app.models.payment  # noqa
import app.models.prerequisite  # noqa
import app.models.waitlist  # noqa
import app.models.planner  # noqa
import app.models.project  # noqa
import app.models.writing  # noqa

def create_tables():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    create_tables()
