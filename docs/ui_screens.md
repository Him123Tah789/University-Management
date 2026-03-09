# UI Screens Outline

The front-end will be built using Next.js and Tailwind CSS. Below is an outline of the primary pages and their core UI components.

## 1. Global Components
- **Top Navigation Bar**: Logo, user profile dropdown (Settings, Logout), Notification Bell (In-app alerts).
- **Sidebar**: Context-aware routing based on role (Dashboard, Registration, Planner, Projects, Writing).

## 2. Live Classes / Booking Platform
- `/live-classes/` (Homepage): Browse active programs/tutors. Filter by subject or availability.
- `/live-classes/{id}` (Class Selection): Detailed course description, syllabus overview, and schedule/batch selector.
- `/checkout` & `/checkout/confirmation`: WooCommerce integration UI, displaying a success payload confirming the automated email/WhatsApp dispatch.

## 3. Dashboards
- `/dashboard/student`:
  - **Overview Widget**: Next upcoming class with direct "Join Zoom" button.
  - **Classes List**: All enrolled batches alongside expiry countdowns and payment histories.
  - **Teacher Notes Widget**: Broadcast messages from assigned tutors.
- `/dashboard/teacher`:
  - **My Schedule Calendar**: Weekly view of assigned live sessions.
  - **Batch Management**: Accordion list of students per batch.
  - **Attendance Module**: Quick checkboxes/toggles for roll calling during or after a session.
- `/dashboard/admin`:
  - **KPI Metrics**: Total enrollments, active waitlists, scheduled notification queue sizes.
  - **Enrollment Table**: Sortable/filterable list with actions to "Move Batch", "Resend Link", or "Export to CSV".

## 4. Smart Semester Registration
- `/registration`:
  - **Course Picker**: Auto-complete search bar to select 4-5 core subjects.
  - **Preferences Form**: Toggles and drop-downs for constraints (e.g., "No classes before 10 AM", "Avoid Fridays").
  - **Schedule Preview Engine**: Visual weekly calendar displaying the dynamically-generated optimal layout with color-coded "Warnings" (Prerequisites, time-conflicts).
  - **Waitlist Prompt**: Sticky banner or modal offering "Join Waitlist" if optimal options are full.

## 5. Study Planner & Projects
- `/planner`:
  - **Upload Screen**: Drag-and-drop zone for Syllabus PDFs.
  - **Timeline View**: Gantt chart or visual roadmap of extracted deadlines and revision dates.
  - **Progress Dashboard**: Exam readiness circular progress bar.
- `/projects`:
  - **Kanban Board**: Drag-and-drop columns (To Do, Doing, Done).
  - **Doc Links & Roles**: Shared repository for Google Drive / GitHub linkages and role assignment.
