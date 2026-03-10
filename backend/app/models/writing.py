from sqlalchemy import Column, BigInteger, Text, Float, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.sql import func
from app.core.db import Base

class WritingAnalysis(Base):
    __tablename__ = "writing_analyses"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    
    text_content = Column(Text, nullable=False)
    similarity_score = Column(Float)
    suggestions = Column(JSON)
    status = Column(Text, nullable=False, default="PENDING") # PENDING, COMPLETED, FAILED
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
