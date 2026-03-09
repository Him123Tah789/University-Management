from sqlalchemy import Column, BigInteger, Text, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.core.db import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(BigInteger, primary_key=True)
    title = Column(Text, nullable=False)
    description = Column(Text)
    created_by_user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)

class ProjectTask(Base):
    __tablename__ = "project_tasks"

    id = Column(BigInteger, primary_key=True)
    project_id = Column(BigInteger, ForeignKey("projects.id"), nullable=False)
    assigned_to_user_id = Column(BigInteger, ForeignKey("users.id"))
    
    title = Column(Text, nullable=False)
    status = Column(Text, nullable=False, default="TODO") # TODO, IN_PROGRESS, DONE
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
