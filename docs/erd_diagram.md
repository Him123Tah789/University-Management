# Entity-Relationship Diagram (ERD) Overview

Below is a high-level Entity-Relationship representation of the core tables necessary for the platform.

```mermaid
erDiagram
    USERS {
        bigint id PK
        string email
        string phone
        string role "STUDENT/TEACHER/ADMIN"
        string hashed_password
    }
    
    EVENT_INBOX {
        bigint id PK
        string provider
        string event_type
        string external_event_id
        jsonb payload_json
        timestamp received_at
        timestamp processed_at
        string status
    }

    SCHEDULED_NOTIFICATIONS {
        bigint id PK
        bigint user_id FK
        string channel
        string template_key
        jsonb payload_json
        timestamp send_at
        string status
    }
    
    JOB_LOGS {
        bigint id PK
        string job_type
        string ref_table
        bigint ref_id
        string status
        timestamp started_at
    }

    COURSES {
        bigint id PK
        string title
        string description
    }
    
    SECTIONS {
        bigint id PK
        bigint course_id FK
        int capacity
        int enrolled_count
    }
    
    ENROLLMENTS {
        bigint id PK
        bigint user_id FK
        bigint section_id FK
        timestamp enrolled_at
    }
    
    WAITLISTS {
        bigint id PK
        bigint user_id FK
        bigint course_id FK
        timestamp requested_at
    }

    PAYMENTS {
        bigint id PK
        bigint user_id FK
        string order_id
        float amount
    }

    USERS ||--o{ SCHEDULED_NOTIFICATIONS : "receives"
    USERS ||--o{ ENROLLMENTS : "has"
    USERS ||--o{ WAITLISTS : "joins"
    USERS ||--o{ PAYMENTS : "makes"
    
    COURSES ||--|{ SECTIONS : "contains"
    SECTIONS ||--o{ ENROLLMENTS : "has"
```

## Description of Core Tables
1. **Event Inbox**: The entry portal for webhooks. Guarantees auditability and idempotency.
2. **Scheduled Notifications**: The automation workflow engine where all future events (reminders, expiry warnings) sit until Celery Beat dispatches them.
3. **Job Logs**: Traceability for all background Celery tasks, essential for university administration audits.
4. **Domain Tables**: (Users, Courses, Sections, Enrollments, Waitlists, Payments) manage the standard academic rules and constraints.
