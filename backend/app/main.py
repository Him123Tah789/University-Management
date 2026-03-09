from fastapi import FastAPI
from app.api.routes.webhooks_woocommerce import router as woo_router
from app.api.routes.dashboards import router as dashboards_router
from app.api.routes.registration import router as registration_router
from app.api.routes.planner import router as planner_router
from app.api.routes.projects import router as projects_router
from app.api.routes.writing import router as writing_router

app = FastAPI(title="Student Integrating Platform API")

app.include_router(woo_router)
app.include_router(dashboards_router, prefix="/api/v1")
app.include_router(registration_router, prefix="/api/v1")
app.include_router(planner_router, prefix="/api/v1")
app.include_router(projects_router, prefix="/api/v1")
app.include_router(writing_router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"ok": True}
