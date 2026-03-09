from sqlalchemy import Column, BigInteger, ForeignKey
from app.core.db import Base

class CoursePrerequisite(Base):
    __tablename__ = "course_prerequisites"

    id = Column(BigInteger, primary_key=True)
    course_id = Column(BigInteger, ForeignKey("courses.id"), nullable=False)
    prerequisite_course_id = Column(BigInteger, ForeignKey("courses.id"), nullable=False)
