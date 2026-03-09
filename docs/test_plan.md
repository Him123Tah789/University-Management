# System Test Plan

This test plan ensures the university grade platform remains stable throughout its development lifecycle. Tests are partitioned by modules and integration scopes.

## 1. End-To-End (E2E) Critical Workflows

### Scenario 1: The Automation Pipeline (Live Classes)
- **Objective**: Verify that a successful WooCommerce payment guarantees Zoom link delivery and schedules future reminders without double-sending.
- **Steps**:
  1. Trigger local webhook via `curl` mimicking WooCommerce POST event.
  2. Query `event_inbox` asserting receipt and status = `PROCESSED`.
  3. Query `scheduled_notifications` asserting the creation of immediate and future rows.
  4. Wait 65 seconds for the Beat dispatcher cycle.
  5. Assert rows transitioned to `LOCKED` then `SENT`.
  6. Check `job_logs` for `SUCCESS` entries.

### Scenario 2: Smart Semester Registration Conflict
- **Objective**: Verify the rules engine rejects overlapping classes and enforces prerequisites.
- **Steps**:
  1. Enroll user in Course A (Tue/Thu 10:00 AM) - *Passes*.
  2. Attempt enrollment in Course B (Tue/Thu 10:30 AM) - *Fails due to conflict*.
  3. Attempt enrollment in Course C without prerequisite Course X - *Fails due to prerequisites*.
  4. System offers waitlist option for Course B's alternate section (Mon/Wed 10:00 AM) - *Waitlist entry successfully logged*.

### Scenario 3: Waitlist Automation
- **Objective**: Verify that opening a new section automatically alerts waitlisted users.
- **Steps**:
  1. Add 3 users to a waitlist for Course D.
  2. Admin provisions a new Section for Course D with capacity = 20.
  3. Assert system generates `scheduled_notifications` addressed to the 3 waitlisted users.

## 2. Infrastructure Resilience Tests

### Load Testing Webhooks
- **Tool**: Locust or JMeter
- **Condition**: Blast 500 simultaneous WooCommerce webhook events for the same `order_id` (simulated retry storm).
- **Expectation**: Exactly 1 payload is processed, the other 499 trigger atomic `IntegrityError` fallbacks, resulting in 0 duplicate orders and 0 duplicate emails sent.

### Single-Device Login Test
- **Steps**: 
  1. Log in User A on Browser 1 (Token 1 generated).
  2. Log in User A on Browser 2 (Token 2 generated).
  3. Make authenticated request using Token 1 - *Fails (401 Unauthorized), session revoked*.
  4. Make authenticated request using Token 2 - *Passes*.

## 3. Unit Testing Stubs
To be executed per PR/Commit using `pytest`:
- `test_template_renderer.py`: Validates string interpolations do not raise KeyError.
- `test_verify_woo_signature.py`: Validates malicious HMACS are strictly rejected.
- `test_prerequisite_engine.py`: Validates logic trees for academic rules.
