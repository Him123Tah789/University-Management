from sqlalchemy import Column, BigInteger, Text, Integer, Float, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.core.db import Base

class SyllabusData(Base):
    __tablename__ = "syllabus_data"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    file_path = Column(Text, nullable=False)
    extraction_status = Column(Text, nullable=False, default="PENDING") # PENDING, COMPLETED, FAILED
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)

class StudyTask(Base):
    __tablename__ = "study_tasks"

    id = Column(BigInteger, primary_key=True)
    syllabus_id = Column(BigInteger, ForeignKey("syllabus_data.id"), nullable=False)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    
    title = Column(Text, nullable=False)
    week_number = Column(Integer)
    is_exam = Column(Boolean, default=False)
    due_date = Column(TIMESTAMP(timezone=True))
    completed = Column(Boolean, default=False)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
