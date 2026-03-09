from sqlalchemy import Column, BigInteger, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from app.core.db import Base

class EventInbox(Base):
    __tablename__ = "event_inbox"

    id = Column(BigInteger, primary_key=True)
    provider = Column(Text, nullable=False)
    event_type = Column(Text, nullable=False)
    external_event_id = Column(Text, nullable=False)
    payload_json = Column(JSONB, nullable=False)

    received_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    processed_at = Column(TIMESTAMP(timezone=True))
    status = Column(Text, nullable=False, default="RECEIVED")
    error = Column(Text)
