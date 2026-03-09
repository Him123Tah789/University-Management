from pydantic import BaseModel
from typing import Any, Dict, Optional

class WooWebhookPayload(BaseModel):
    id: Optional[int] = None  # order id
    status: Optional[str] = None
    billing: Optional[Dict[str, Any]] = None
    line_items: Optional[list[Dict[str, Any]]] = None
    meta_data: Optional[list[Dict[str, Any]]] = None
