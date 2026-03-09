from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel

from app.core.db import get_db
from app.models.writing import WritingAnalysis
from app.workers.tasks import analyze_text_job

router = APIRouter(prefix="/writing", tags=["writing"])

class WritingSubmit(BaseModel):
    text: str

@router.post("/{user_id}/analyze")
def submit_writing_for_analysis(user_id: int, req: WritingSubmit, db: Session = Depends(get_db)):
    analysis = WritingAnalysis(user_id=user_id, text_content=req.text)
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    
    analyze_text_job.delay(analysis.id)
    return {"status": "processing", "analysis_id": analysis.id, "message": "Text queued for Similarity, APA Citations, and Paraphrasing."}

@router.get("/{analysis_id}/result")
def get_analysis_result(analysis_id: int, db: Session = Depends(get_db)):
    analysis = db.query(WritingAnalysis).filter(WritingAnalysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
        
    return {
        "status": analysis.status,
        "similarity_score": analysis.similarity_score,
        "suggestions": analysis.suggestions
    }
