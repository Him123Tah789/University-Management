from sqlalchemy import Column, BigInteger, Text, TIMESTAMP
from sqlalchemy.sql import func
from app.core.db import Base

class JobLog(Base):
    __tablename__ = "job_logs"

    id = Column(BigInteger, primary_key=True)
    job_type = Column(Text, nullable=False)
    ref_table = Column(Text, nullable=False)
    ref_id = Column(BigInteger, nullable=False)

    status = Column(Text, nullable=False)  # SUCCESS/FAIL
    error = Column(Text)

    started_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    finished_at = Column(TIMESTAMP(timezone=True))
