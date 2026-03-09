# University Student Integrating Platform - Architecture

## 1. System Overview
The University Student Integrating Platform is a centralized, modular system built using the "One System" rule. It encompasses Smart Semester Registration, Live Classes management, a Study Planner, Group Project Management, and Academic Integrity Writing Helpers. All modules plug into a shared core, providing a unified experience for students, teachers, and administrators.

## 2. Core Principles (The "One System" Rule)
All modules rely on the **Shared Core**, which handles:
- **Authentication & Roles**: Unified access control for Students, Teachers, and Admins.
- **Single-Device Login**: Managed via Redis session locking to enforce accountability and prevent account sharing.
- **Unified Calendar/Timeline**: Centralized scheduling across courses, classes, exams, and tasks.
- **Task Engine & Notifications**: Celery-powered asynchronous tasks and messaging via WhatsApp, Email, and In-App channels.
- **Audit Logs**: Secure, immutable activity tracking ensuring management trust.

## 3. Technology Stack

### Frontend (User Interface)
- **Framework**: Next.js + Tailwind CSS
- **Delivery**: Single web application
- **Routing Modules**:
  - `/registration`: Smart Semester Registration
  - `/planner`: Syllabus Study Planner
  - `/projects`: Group Project Manager
  - `/writing`: Academic Integrity Helper
  - `/live-classes`: Live Class booking
  - `/dashboard`: Role-based dashboards (Student, Teacher, Admin)

### Backend (API & Business Logic)
- **Framework**: FastAPI
- **Database**: PostgreSQL (System DB)
- **Cache & Sessions**: Redis (Session locks, Celery broker, rate limits)

### Asynchronous Operations (Automation Core)
- **Task Engine**: Celery Worker (Message dispatch, PDF extraction, ML embeddings)
- **Scheduler**: Celery Beat (Periodic polling for reminders, expiry alerts, and waitlist checks)

### Integrations
- **Payments**: WooCommerce Webhook (Triggers upon paid order)
- **Communications**: WhatsApp API (Twilio/Meta) and Email SMTP
- **Conferencing**: Zoom (Links stored in DB, integration via API planned for future iterations)

## 4. Module Breakdown

### Module A: Smart Semester Registration
- **Functionality**: Replaces manual advising load. Students choose 4-5 desired courses with time constraints.
- **Engine**: System validates prerequisites, checks section availability, detects time conflicts, and outputs the optimal schedule.
- **Waitlist Logic**: Auto-enrollment and notification when a new section opens or a seat frees up.

### Module B: Live Classes Platform
- **Functionality**: Complete lifecycle from browsing tutors to class confirmation.
- **Dashboards**:
  - *Student*: Enrolled classes, Zoom links, payment history, teacher notes.
  - *Teacher*: Assigned batches, student lists, schedule, attendance tracking.
  - *Admin*: Complete oversight, batch movement, list exports.
- **Automation**: Payment triggers WooCommerce webhook -> Batch assignment -> Confirmation & Zoom link via WhatsApp/Email.

### Module C: Study Planner from Syllabus
- **Functionality**: AI-powered PDF extraction generates weekly and daily checklists.
- **Features**: Generates exam readiness scores, tracks student progress, and issues "behind schedule" warnings based on a rules engine.

### Module D & E: Group Projects and Writing Helper
- **Projects**: Kanban boards, submission checklists, version linking, and meeting minutes-to-tasks conversion.
- **Writing Helper**: Ethical paraphrasing, APA/IEEE/MLA citations, similarity-risk heuristics, and evidence mapping.
