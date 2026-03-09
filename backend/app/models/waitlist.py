from sqlalchemy import Column, BigInteger, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.core.db import Base

class Waitlist(Base):
    __tablename__ = "waitlists"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    course_id = Column(BigInteger, ForeignKey("courses.id"), nullable=False)
    requested_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
