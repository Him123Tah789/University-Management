# Automation Workflows Overview

This document describes the exact implementation paths and logical steps for the background automation handled by Celery and Redis in the University Management Platform.

## 1. Concept: Idempotency and Webhooks
All incoming events (such as WooCommerce payment confirmations) enter the system via Fast API endpoints (e.g., `/webhooks/woocommerce/order-paid`). Key steps:
1. **Verification**: The endpoint hashes the raw body payload with a shared secret (`WOOCOMMERCE_WEBHOOK_SECRET`) to ensure authenticity.
2. **Idempotency Check**: The payload is stored in the `event_inbox` table. A unique constraint on `(provider, external_event_id)` ensures duplicate webhooks are ignored gracefully (`IntegrityError` rollback).

## 2. Main Workflow: Live Class Payment to Notification
Once a webhook is safely stored in `event_inbox`, the system acts inside the `handle_paid_order()` logic block:

```python
# Pseudo-flow of handle_paid_order(db, payload)
1. Extract student details (phone, email) from WooCommerce billing payload.
2. Identify or create the 'User' record.
3. Fetch the class/course details and applicable 'Batch' with Zoom Link.
4. INSERT immediate ScheduledNotification -> "order_confirm" (Sends in 5 seconds).
5. INSERT immediate ScheduledNotification -> "zoom_link" (Sends in 10 seconds).
6. Calculate future class times -> INSERT future ScheduledNotification for each (Sends 30 minutes before class).
7. Calculate expiry date -> INSERT future ScheduledNotification -> "expiry_warning" (Sends 7, 3, and 1 days before).
```

## 3. The Dispatcher (Celery Beat)
The "Heartbeat" of the automation is a scheduled task that runs every minute:

- **Query**: Checks for `status = 'PENDING'` where `send_at <= NOW()`.
- **Concurrency Protection**: Uses PostgreSQL's `FOR UPDATE SKIP LOCKED` to lock rows atomically. This ensures if multiple Celery workers are querying simultaneously, they do not grab the same notifications (preventing "double sends" to the student).
- **Action**: It changes status to `LOCKED` and immediately drops the primary key `id` into the Redis Broker using `send_notification.delay(id)`.

## 4. The Worker (Celery Task)
The final step is performed by the worker consuming from the Redis queue.

1. Takes the locked `ScheduledNotification.id`.
2. Generates the message heavily relying on `template_renderer.py` mapping variables (like class title and Zoom link) into strings.
3. Detects `channel`:
   - If `"whatsapp"`, routes to Twilio/Meta integration function.
   - If `"email"`, routes to python `smtplib` wrapper.
4. Records outcome: Updates `status = 'SENT'` and logs a strict history in the `job_logs` table.
5. Error Handling: Uses Celery's native retry decorators (`max_retries=5`, `default_retry_delay=30`). Failure updates status to `FAILED` and increments `retry_count`.
