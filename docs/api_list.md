# API Route List (FastAPI Core)

Below is the structured list of APIs that the backend will expose to power the front-end application and handle external integrations.

## 1. Authentication & Security
- `POST /api/v1/auth/login` - Authenticate user, issue JWT token, and register active session in Redis (enforcing single-device).
- `POST /api/v1/auth/logout` - Invalidate current session token.
- `GET /api/v1/users/me` - Retrieve claims for the current user and their dashboard configuration.

## 2. Webhooks & Integrations
- `POST /webhooks/woocommerce/order-paid` - Idempotent listener for completed WooCommerce orders. Verifies signature, logs to `event_inbox`, and triggers enrollment automation.

## 3. Semester Registration (Module A)
- `GET /api/v1/courses/available` - List all courses with active sections.
- `POST /api/v1/registration/analyze` - Submit 4-5 desired courses with time preferences. Returns a built schedule and/or warnings (conflict, prerequisites, full sections).
- `POST /api/v1/registration/enroll` - Finalize enrollment for selected schedule sections.
- `POST /api/v1/registration/waitlist` - Add student to waitlist if sections are full.

## 4. Live Classes & Dashboards (Module B)
- `GET /api/v1/dashboards/student` - Fetches enrolled classes, next live class properties, zoom links, and upcoming expiry dates.
- `GET /api/v1/dashboards/teacher` - Fetches assigned batches, student rosters, and schedules for the logged-in teacher.
- `GET /api/v1/dashboards/admin/enrollments` - Pagination endpoint for sweeping enrollments, join dates, and batch movements.
- `PUT /api/v1/classes/{class_id}/attendance` - Teacher endpoint to submit/save attendance records.
- `POST /api/v1/admin/batches/move` - Admin endpoint to migrate a student from one batch to another.

## 5. Study Planner & Automation
- `POST /api/v1/planner/upload` - Upload a syllabus PDF to trigger Celery extraction task.
- `GET /api/v1/planner/{doc_id}/status` - Check the background extraction status.
- `GET /api/v1/planner/{user_id}/progress` - Retrieve study plan progress, readiness scores, and behind-schedule warnings.

## 6. Group Projects & Writing
- `POST /api/v1/projects/kanban/tasks` - Create, update, or read tasks in a project Kanban.
- `POST /api/v1/writing/analyze` - Submit text to the Celery NLP worker to generate citations, paraphrase, or calculate theoretical similarity risk.
