from sqlalchemy import Column, BigInteger, TIMESTAMP, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from app.core.db import Base

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    section_id = Column(BigInteger, ForeignKey("sections.id"), nullable=False)
    
    enrolled_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)

    __table_args__ = (
        UniqueConstraint('user_id', 'section_id', name='uq_enrollment_user_section'),
    )
