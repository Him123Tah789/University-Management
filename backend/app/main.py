from fastapi import FastAPI
from app.api.routes.webhooks_woocommerce import router as woo_router
from app.api.routes.dashboards import router as dashboards_router
from app.api.routes.registration import router as registration_router
from app.api.routes.planner import router as planner_router
from app.api.routes.projects import router as projects_router
from app.api.routes.writing import router as writing_router
from app.core.db import engine, Base
# Import models to ensure they are registered with Base.metadata
from app.models import (
    User, Course, Section, Enrollment, Waitlist, CoursePrerequisite, 
    EventInbox, Payment, ScheduledNotification, JobLog, 
    SyllabusData, StudyTask, Project, ProjectTask, WritingAnalysis
)

Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Student Integrating Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(woo_router)
app.include_router(dashboards_router, prefix="/api/v1")
app.include_router(registration_router, prefix="/api/v1")
app.include_router(planner_router, prefix="/api/v1")
app.include_router(projects_router, prefix="/api/v1")
app.include_router(writing_router, prefix="/api/v1")

from app.routes.chat_local import router as chat_router
app.include_router(chat_router)

@app.get("/health")
def health():
    return {"ok": True}
