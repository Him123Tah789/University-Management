import uuid
import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List, Dict, Any

from app.core.db import get_db
from app.models.user import User
from app.models.planner import SyllabusData, StudyTask
from app.workers.tasks import extract_syllabus_pdf

router = APIRouter(prefix="/planner", tags=["planner"])

@router.post("/upload")
async def upload_syllabus(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    os.makedirs("/tmp/syllabuses", exist_ok=True)
    file_path = f"/tmp/syllabuses/{uuid.uuid4()}_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
        
    syllabus = SyllabusData(user_id=user.id, file_path=file_path, extraction_status="PENDING")
    db.add(syllabus)
    db.commit()
    db.refresh(syllabus)
    
    # Trigger Celery Task
    extract_syllabus_pdf.delay(syllabus.id)
    
    return {"status": "processing", "syllabus_id": syllabus.id, "message": "File uploaded and extraction started natively."}

@router.get("/{user_id}/progress", response_model=Dict[str, Any])
def get_study_progress(user_id: int, db: Session = Depends(get_db)):
    total_tasks = db.query(StudyTask).filter(StudyTask.user_id == user_id).count()
    completed_tasks = db.query(StudyTask).filter(StudyTask.user_id == user_id, StudyTask.completed == True).count()
    
    exam_readiness = 0
    if total_tasks > 0:
        exam_readiness = int((completed_tasks / total_tasks) * 100)
        
    pending_tasks = db.query(StudyTask).filter(
        StudyTask.user_id == user_id, 
        StudyTask.completed == False
    ).order_by(StudyTask.due_date.asc()).limit(5).all()

    warning = "You are falling behind!" if exam_readiness < 50 and total_tasks > 0 else "On track!"

    return {
        "readiness_score": exam_readiness,
        "warning": warning,
        "upcoming_deadlines": [{"title": t.title, "due": t.due_date.isoformat() if t.due_date else None} for t in pending_tasks]
    }
