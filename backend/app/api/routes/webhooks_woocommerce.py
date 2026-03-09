from fastapi import APIRouter, Request, Header, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.services.webhook_service import verify_woo_signature, ingest_and_process_order_paid

router = APIRouter(prefix="/webhooks/woocommerce", tags=["webhooks"])

@router.post("/order-paid")
async def woo_order_paid(
    request: Request,
    x_wc_webhook_signature: str = Header(default=""),
    db: Session = Depends(get_db),
):
    raw = await request.body()
    if not x_wc_webhook_signature:
        raise HTTPException(status_code=400, detail="Missing signature header")

    if not verify_woo_signature(raw, x_wc_webhook_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    payload = await request.json()
    order_id = payload.get("id") or payload.get("order_id") or payload.get("number")
    if not order_id:
        raise HTTPException(status_code=400, detail="Missing order id")

    return ingest_and_process_order_paid(db, external_event_id=str(order_id), payload=payload)
