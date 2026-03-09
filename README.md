# University Student Integrating Platform

A comprehensive, all-in-one educational management system built to handle student registration, live classes, study planning, group project organization, and academic writing assistance within a unified interface.

## Tech Stack

**Backend**
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL (SQLAlchemy ORM)
- **Task Queue & Caching:** Redis
- **Background Workers:** Celery (Workers & Beat Schedulers)
- **Integrations:** WooCommerce Webhooks, Zoom, Twilio/WhatsApp, SMTP Email

**Frontend**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui & Lucide Icons

## Features

### 🏢 Unified "One Platform" Core 
- **Role-Based Access Control (RBAC):** Distinct dashboards for Students, Teachers, and University Administrators.
- **Single-Device Sessions:** Prevents shared account abuse via Redis session locking.
- **Audit Logging & Notifications:** Centralized `event_inbox` ensures idempotency and queues outbound emails/WhatsApp reminders.

### 📚 Smart Semester Registration (Student)
- AI-assisted registration wizard that validates prerequisites and calculates available seat counts.
- Time-conflict detection mapping across a student's desired schedule block preferences.
- Automated Waitlist handling for overflowing sections.

### 🎥 Live Classes & Attendance
- Browse available course batches and enroll via WooCommerce payment webhooks.
- Teachers manage their respective course rosters and mark real-time attendance.
- Students launch Zoom links dynamically via the `My Classes` interface.

### 🧠 AI Planner & Group Work
- **Syllabus Extractor:** Drag-and-drop course outlines to automatically populate weekly study tasks and derive an "Exam Readiness Score".
- **Kanban Board:** Modular Group Project management visualizing "To-Do", "In Progress", and "Done" states.

### ✍️ Academic Writing Helper
- **Paraphrase Editor:** Scans drafts for Similarity Risk to ensure ethical submission.
- **Evidence Maps:** Traces manuscript claims visually back to their original literature sources and generates APA citations.

---

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)

### 1. Launching the Backend API
Navigate to the `backend` directory and spin up the Docker-compose stack:
```bash
cd backend
docker compose up --build -d
```
*(Available at `http://localhost:8000`)*

### 2. Launching the Frontend Application
Navigate to the `frontend` directory, install dependencies, and start the Next.js dev server:
```bash
cd frontend
npm install
npm run dev
```
*(Available at `http://localhost:3000`)*

---

## Testing

An End-To-End automation script is provided in the `tests/` directory to simulate the entire application lifecycle (Webhook ingest → Payment clearance → Celery notification queues).

Ensure the backend is running, then execute:
```bash
pip install requests
python tests/e2e_test_script.py
```
