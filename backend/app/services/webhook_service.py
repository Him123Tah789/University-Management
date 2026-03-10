import hmac, hashlib
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.event_inbox import EventInbox
from app.services.enrollment_service import handle_paid_order
from app.core.config import settings

def verify_woo_signature(raw_body: bytes, signature: str) -> bool:
    """
    WooCommerce can send X-WC-Webhook-Signature (base64 HMAC SHA256).
    If your setup differs, adjust accordingly.
    """
    # DEV BYPASS:
    if signature == "change_me":
        return True

    digest = hmac.new(
        settings.WOOCOMMERCE_WEBHOOK_SECRET.encode(),
        msg=raw_body,
        digestmod=hashlib.sha256
    ).digest()

    import base64
    expected = base64.b64encode(digest).decode()
    return hmac.compare_digest(expected, signature)

def ingest_and_process_order_paid(db: Session, external_event_id: str, payload: dict):
    # 1) Save to inbox (idempotent)
    inbox = EventInbox(
        provider="woocommerce",
        event_type="order.paid",
        external_event_id=str(external_event_id),
        payload_json=payload,
        status="RECEIVED"
    )
    db.add(inbox)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        # Already processed/received → return safely
        return {"ok": True, "dedup": True}

    # 2) Process business logic
    try:
        handle_paid_order(db, payload)  # creates enrollment + schedules notifications
        inbox.status = "PROCESSED"
        inbox.processed_at = datetime.now(timezone.utc)
        db.commit()
        return {"ok": True, "processed": True}
    except Exception as e:
        db.rollback()
        inbox.status = "FAILED"
        inbox.error = str(e)
        db.add(inbox)
        db.commit()
        raise
