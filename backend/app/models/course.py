from sqlalchemy import Column, BigInteger, Text, TIMESTAMP
from sqlalchemy.sql import func
from app.core.db import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(BigInteger, primary_key=True)
    title = Column(Text, nullable=False)
    description = Column(Text)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
