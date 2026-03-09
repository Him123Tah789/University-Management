from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List, Dict, Any

from app.core.db import get_db
from app.models.user import User
from app.models.section import Section
from app.models.course import Course
from app.models.enrollment import Enrollment

router = APIRouter(prefix="/dashboards", tags=["dashboards"])

# --- Student Dashboard API ---
@router.get("/student/{user_id}", response_model=Dict[str, Any])
def get_student_dashboard(user_id: int, db: Session = Depends(get_db)):
    # Verify user exists and is a student
    user = db.query(User).filter(User.id == user_id, User.role == "STUDENT").first()
    if not user:
        raise HTTPException(status_code=404, detail="Student not found")

    # Fetch Enrollments
    enrollments = db.query(Enrollment).filter(Enrollment.user_id == user_id).all()
    
    classes_data = []
    for enr in enrollments:
        section = db.query(Section).filter(Section.id == enr.section_id).first()
        course = db.query(Course).filter(Course.id == section.course_id).first() if section else None
        
        if section and course:
            classes_data.append({
                "enrollment_id": enr.id,
                "course_title": course.title,
                "section_title": section.title,
                "schedule": section.schedule_description,
                "zoom_link": section.zoom_link,
                "enrolled_at": enr.enrolled_at.isoformat()
            })

    return {
        "student": {
            "id": user.id,
            "email": user.email
        },
        "enrolled_classes": classes_data
    }

# --- Teacher Dashboard API ---
@router.get("/teacher/{user_id}/sections", response_model=Dict[str, Any])
def get_teacher_sections(user_id: int, db: Session = Depends(get_db)):
    # Verify user is teacher
    user = db.query(User).filter(User.id == user_id, User.role == "TEACHER").first()
    if not user:
        raise HTTPException(status_code=404, detail="Teacher not found")

    sections = db.query(Section).filter(Section.teacher_id == user_id).all()
    
    sections_data = []
    for sec in sections:
        course = db.query(Course).filter(Course.id == sec.course_id).first()
        student_count = db.query(Enrollment).filter(Enrollment.section_id == sec.id).count()
        
        sections_data.append({
            "section_id": sec.id,
            "course_title": course.title if course else "Unknown",
            "section_title": sec.title,
            "schedule": sec.schedule_description,
            "zoom_link": sec.zoom_link,
            "current_enrollments": student_count,
            "capacity": sec.capacity
        })
        
    return {
        "teacher": {"id": user.id, "email": user.email},
        "assigned_sections": sections_data
    }

# --- Teacher Attendance API (Stub logic to expand later) ---
@router.post("/teacher/{user_id}/sections/{section_id}/attendance", response_model=Dict[str, Any])
def submit_attendance(user_id: int, section_id: int, payload: dict, db: Session = Depends(get_db)):
    # In a full app, this iterates through payload{'student_id': status} and saves to Attendance model
    return {"status": "success", "message": f"Attendance submitted for section {section_id}"}

# --- Admin Export API ---
@router.get("/admin/export/enrollments", response_model=Dict[str, Any])
def export_all_enrollments(db: Session = Depends(get_db)):
    # For a real admin route, you would enforce an Admin role dependency Token here
    enrollments = db.query(Enrollment).all()
    
    data = []
    for enr in enrollments:
        student = db.query(User).filter(User.id == enr.user_id).first()
        section = db.query(Section).filter(Section.id == enr.section_id).first()
        course = db.query(Course).filter(Course.id == section.course_id).first() if section else None
        
        data.append({
            "enrollment_id": enr.id,
            "student_id": student.id if student else None,
            "student_email": student.email if student else None,
            "course_title": course.title if course else None,
            "section_title": section.title if section else None,
            "enrolled_at": enr.enrolled_at.isoformat()
        })
        
    return {"export_count": len(data), "data": data}
