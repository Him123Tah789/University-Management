from sqlalchemy import Column, BigInteger, Text, Integer, TIMESTAMP
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from app.core.db import Base

class ScheduledNotification(Base):
    __tablename__ = "scheduled_notifications"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, nullable=False)

    channel = Column(Text, nullable=False)        # email/whatsapp/inapp
    template_key = Column(Text, nullable=False)   # order_confirm, zoom_link, class_reminder...
    payload_json = Column(JSONB, nullable=False)

    send_at = Column(TIMESTAMP(timezone=True), nullable=False)
    status = Column(Text, nullable=False, default="PENDING")  # PENDING|LOCKED|SENT|FAILED|CANCELLED
    locked_at = Column(TIMESTAMP(timezone=True))
    sent_at = Column(TIMESTAMP(timezone=True))

    retry_count = Column(Integer, nullable=False, default=0)
    last_error = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
