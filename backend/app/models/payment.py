from sqlalchemy import Column, BigInteger, Text, Float, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.core.db import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    order_id = Column(Text, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(Text, nullable=False, default="COMPLETED")
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
