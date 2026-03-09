from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel

from app.core.db import get_db
from app.models.user import User
from app.services.registration_service import analyze_registration, join_waitlist
from app.models.course import Course
from app.models.section import Section

router = APIRouter(prefix="/registration", tags=["registration"])

class RegistrationRequest(BaseModel):
    user_id: int
    course_ids: List[int]
    preferences: Dict[str, str] = {}

@router.get("/courses")
def list_available_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    res = []
    for c in courses:
        sections = db.query(Section).filter(Section.course_id == c.id).all()
        res.append({
            "id": c.id,
            "title": c.title,
            "sections": [{"id": s.id, "time": s.schedule_description, "capacity": s.capacity, "enrolled": s.enrolled_count} for s in sections]
        })
    return res

@router.post("/analyze")
def analyze_schedule(req: RegistrationRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    analysis = analyze_registration(db, req.user_id, req.course_ids)
    return analysis

@router.post("/waitlist")
def waitlist_student(user_id: int, course_id: int, db: Session = Depends(get_db)):
    join_waitlist(db, user_id, course_id)
    return {"status": "success", "message": "Added to waitlist. We will notify you when a seat opens."}
