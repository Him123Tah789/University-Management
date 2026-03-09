from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel

from app.core.db import get_db
from app.models.project import Project, ProjectTask

router = APIRouter(prefix="/projects", tags=["projects"])

class ProjectCreate(BaseModel):
    title: str
    description: str

class TaskCreate(BaseModel):
    title: str
    assigned_to_user_id: int

@router.post("/{user_id}/create")
def create_project(user_id: int, req: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(title=req.title, description=req.description, created_by_user_id=user_id)
    db.add(project)
    db.commit()
    db.refresh(project)
    return {"status": "success", "project_id": project.id}

@router.get("/{project_id}/kanban")
def get_kanban_board(project_id: int, db: Session = Depends(get_db)):
    tasks = db.query(ProjectTask).filter(ProjectTask.project_id == project_id).all()
    
    board = {"TODO": [], "IN_PROGRESS": [], "DONE": []}
    for t in tasks:
        if t.status in board:
            board[t.status].append({"id": t.id, "title": t.title, "assignee": t.assigned_to_user_id})
            
    return {"project_id": project_id, "board": board}

@router.post("/{project_id}/tasks")
def add_task(project_id: int, req: TaskCreate, db: Session = Depends(get_db)):
    task = ProjectTask(project_id=project_id, title=req.title, assigned_to_user_id=req.assigned_to_user_id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return {"status": "success", "task_id": task.id}
