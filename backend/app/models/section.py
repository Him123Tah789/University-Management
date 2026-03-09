from sqlalchemy import Column, BigInteger, Text, Integer, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.core.db import Base

class Section(Base):
    __tablename__ = "sections"

    id = Column(BigInteger, primary_key=True)
    course_id = Column(BigInteger, ForeignKey("courses.id"), nullable=False)
    teacher_id = Column(BigInteger, ForeignKey("users.id"))
    
    title = Column(Text, nullable=False) # e.g. "Batch A"
    schedule_description = Column(Text) # e.g. "Tue/Thu 10:00 AM"
    zoom_link = Column(Text)
    
    capacity = Column(Integer, nullable=False, default=0)
    enrolled_count = Column(Integer, nullable=False, default=0)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
