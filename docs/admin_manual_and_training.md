# Administrator Manual & Training Script

## Administrator Overview
The University Student Integrating Platform serves as your control center for academic operations. Through the Admin Dashboard, you can oversee Semester Registrations, Live Class Operations, Waitlists, and Automated Communications.

---

## 1. Managing Active Batches & Live Classes

### Scenario: Checking Attendance and Exporting Lists
Teachers handle immediate roll-calls, but admins can export aggregate data anytime.
1. Navigate to **"Live Classes" > "Batches"** in your sidebar.
2. Select the batch you wish to review.
3. Click **"Export Student Roster (CSV)"** to instantly download the list, containing joining dates, payment history status, and phone details.

### Scenario: Moving a Student to a New Batch
Sometimes a student cannot attend their original class schedule.
1. Locate the student under **"System Users"** or inside their current **"Batch"**.
2. Click **"Move Batch"**.
3. Select the target batch from the drop-down. The system automatically verifies capacity.
4. *Note: If the new batch is full, the system alerts you and offers to add the student to a waitlist instead.*

---

## 2. Administering Semester Registration

### Creating Courses and Prerequisites
Before registration opens, structure your semester offerings:
1. Navigate to **"Registration Setup" > "Courses"**.
2. Click **"Add Course"**. 
3. Under the **"Rules"** tab, search and select prerequisites (e.g., must complete ENG 101 before taking ENG 102).
4. Add **Sections** (days, times, teacher assignment, and seat capacity).

### Managing Waitlists & Over-Enrollment
When a popular section fills up, students are queued into a waitlist automatically. 
1. Go to **"Registration" > "Waitlists"**.
2. You’ll see red alerts for classes with high waitlist volumes.
3. To relieve pressure, click **"Open New Section"** against the highly-demanded course.
4. Set the new schedule details.
5. **CRITICAL:** The system will immediately notify all students on the waitlist regarding the new opening via their preferred channel (Email / WhatsApp).

---

## 3. Operations & Automation Troubleshooting

### The Job Logs Audit Page
If a student reports missing their Zoom link or Confirmation message:
1. Navigate to **"System Logs" > "Job Executions"**.
2. Filter by the student's email or phone number.
3. Review the exact timeline: received webhook, generated template, locked task, and sent status.
4. If a message failed (e.g., invalid phone number), the system retains the error log. You can securely correct the number in their profile and click **"Manual Resend Notification"**.

---

## Video Training Script (For Demo Walkthrough)

**(Scene starts on the main Admin Dashboard, highlighting key metrics.)**

**Voiceover:** "Welcome to the central control panel of the University Integrating Platform. This single system unifies your entire academic workflow—from smart registrations to live class management."

**(Visual shifts to the Semester Registration setup screen.)**

**Voiceover:** "Let's observe the Smart Semester Registration in action. We can see high waitlist volume for 'Advanced Calculus'. As an admin, I simply click the 'Add Section' button to provision a new tutor schedule."

**(Visual shifts to a mobile mockup showing a WhatsApp popup.)**

**Voiceover:** "Instantly, the background automation contacts waitlisted students on WhatsApp or Email alerting them that a seat is now available. Zero manual follow-up required."

**(Visual shifts to the Live Classes - WooCommerce Webhook timeline.)**

**Voiceover:** "When students pay for a Live Class or course package through our WooCommerce integration, notice what happens behind the scenes. The payment webhook hits our system. Within seconds..." 

**(Screen zooms in on the Job Executions log showing green 'SUCCESS' indicators.)**

**Voiceover:** "...The student is mapped to their batch, and their custom Zoom link is delivered straight to their phone alongside a complete schedule of future reminders."

**(Final visual: Admin exporting an attendance CSV.)**

**Voiceover:** "Complete operational control, comprehensive audit logs, and effortless automation. That is the power of the University Student Integrating Platform."
