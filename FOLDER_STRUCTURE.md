# 📁 SkillHub — Project Folder Structure & Architecture Reference

This document provides a comprehensive map of the **Frontend** and **Backend** folder structure, package design, and file responsibilities across the **SkillHub** platform.

---

## 📌 Table of Contents
- [1. High-Level Workspace Architecture](#1-high-level-workspace-architecture)
- [2. Frontend Architecture & Folder Structure (`frontend/`)](#2-frontend-architecture--folder-structure-frontend)
- [3. Backend Architecture & Package Structure (`SkillHub-main/skillhub/`)](#3-backend-architecture--package-structure-skillhub-mainskillhub)
- [4. Database Relational Persistence Layer](#4-database-relational-persistence-layer)
- [5. Integration & Data Flow](#5-integration--data-flow)

---

## 1. High-Level Workspace Architecture

```
SkillHub/
├── README.md                      # Master repository documentation (GitHub landing)
├── FOLDER_STRUCTURE.md            # Complete architecture & folder breakdown (this file)
├── .gitignore                     # Git ignore rules (build target, classes, logs)
│
├── frontend/                      # Standalone Frontend (HTML5, Bootstrap 5.3, Vanilla ES6+)
│   ├── assets/
│   │   ├── css/style.css          # Design system, CSS variables, glassmorphism, responsive badges
│   │   └── js/
│   │       ├── api.js             # Centralized REST API client (Fetch API, auth tokens, error toasts)
│   │       └── app.js             # Layout manager (universal navbar, footer, live backend status)
│   ├── index.html                 # Landing page (hero banner, live stats, skills carousel)
│   ├── login.html                 # Student login page with demo auto-fill shortcuts
│   ├── register.html              # Student registration form (department, year, password)
│   ├── dashboard.html             # Student dashboard (live statistics, pending incoming/outgoing requests)
│   ├── explore-skills.html        # Campus catalog & discovery (search, category/level filters, request modal)
│   ├── my-skills.html             # Mentor offering hub (choose from catalog or create new skill)
│   ├── requests.html              # Dual-tab requests hub (accept/decline requests, status lifecycle)
│   ├── sessions.html              # Active & completed sessions tracker with 1-click Google Meet launch
│   ├── reviews.html               # 5-star interactive rating and peer review manager
│   ├── profile.html               # Student profile view and editor
│   ├── admin.html                 # Token-secured administrative console (/admin/**)
│   └── README.md                  # Frontend documentation & fast demo accounts
│
└── SkillHub-main/
    ├── skillhub.sql               # MySQL relational database dump (schema + initial test data)
    ├── screenshots/               # Visual proof screenshots (database tables, Postman tests)
    │   ├── database-tables.png
    │   ├── postman-student.png
    │   ├── postman-skill.png
    │   └── postman-request.png
    │
    └── skillhub/                  # Complete Spring Boot 3.5 Backend Project
        ├── pom.xml                # Maven project object model (dependencies, plugins, Java 21)
        ├── mvnw / mvnw.cmd        # Apache Maven wrapper scripts (Linux/macOS & Windows)
        ├── .mvn/                  # Maven wrapper settings
        └── src/
            └── main/
                ├── java/com/skillhub/   # Java Source Code (Layered 3-Tier Architecture)
                └── resources/           # Configuration & Embedded Static Assets
```

---

## 2. Frontend Architecture & Folder Structure (`frontend/`)

The frontend adopts a responsive multi-page architecture engineered with **HTML5, CSS3, Bootstrap 5.3.3, and Vanilla JavaScript (ES6+)**, eliminating Node.js/bundler overhead for instant portability.

```
frontend/
│
├── assets/
│   ├── css/
│   │   └── style.css              # Custom styling, glassmorphism navbars, star rating widgets, status badges
│   └── js/
│       ├── api.js                 # Centralized API service with async/await, error handling, session storage
│       └── app.js                 # Universal layout injector (renders navbar, footer, real-time backend health pill)
│
├── index.html                     # Home page: Hero headline, dynamic cards, stats counter, campus catalog preview
├── login.html                     # Authentication view: Form validation, password visibility toggle, 1-click demo login
├── register.html                  # Onboarding view: Campus email, department & year dropdowns, password confirmation
├── dashboard.html                 # Student hub: Overview of incoming mentor requests, offered skills, and campus feedback
├── explore-skills.html            # Search & discovery: Live filter by category/proficiency, "Request Mentorship" modal
├── my-skills.html                 # Mentor offerings: Publish skills you teach with Beginner/Intermediate/Advanced levels
├── requests.html                  # Request manager: Incoming requests (Accept/Decline) and Outgoing requests (Cancel)
├── sessions.html                  # Live sessions: Track ongoing sessions with [📹 Start Google Meet] and [✉️ Campus Email]
├── reviews.html                   # Peer evaluations: Submit 1–5 star reviews for completed exchanges
├── profile.html                   # User settings: Edit name, department, year, password, or delete account
├── admin.html                     # Admin console: Inspect all students, moderate skills catalog, audit request transactions
└── README.md                      # Standalone frontend documentation and fast-login guide
```

### 📄 Detailed Frontend File Responsibilities

| File | Purpose & Endpoint Mappings |
| :--- | :--- |
| **`assets/js/api.js`** | Centralized API client. Handles dynamic base URLs, authentication state in `localStorage`/`sessionStorage`, request wrappers, and animated toast notifications. |
| **`assets/js/app.js`** | Layout controller. Injects universal navbar and footer placeholders, monitors live backend connectivity, and handles user logout. |
| **`assets/css/style.css`**| Modern design system overrides: CSS variables, star ratings, avatar badges, status indicators, and smooth scrolling. |
| **`index.html`** | Public landing page displaying live platform counters, 4-step process guide, and campus catalog carousel (`GET /students`, `GET /skills`, `GET /requests`). |
| **`login.html`** | Authentication interface supporting password toggle and 1-click demo login buttons (`POST /students/login`). |
| **`register.html`** | Student registration with department and academic year selectors (`POST /students/register`). |
| **`dashboard.html`** | Authenticated student portal displaying pending incoming requests, outgoing requests, active offerings, and ratings. |
| **`explore-skills.html`** | Campus search and mentor discovery directory with category filters, proficiency tags, and mentorship request modal. |
| **`my-skills.html`** | Mentorship offerings management page where students list skills they can teach with proficiency levels (`POST/DELETE /student-skills`). |
| **`requests.html`** | Dual-tab exchange hub for mentors and learners to accept, decline, or complete requests (`PUT /requests/{id}/status`). |
| **`sessions.html`** | Active session tracker equipped with direct **1-Click Google Meet** launch (`https://meet.google.com/new`) and **Campus Email** actions. |
| **`reviews.html`** | Feedback interface allowing learners to submit quantitative (1–5 stars) and qualitative reviews for completed sessions (`POST /ratings`). |
| **`profile.html`** | Profile management allowing students to view and update personal information or delete their account. |
| **`admin.html`** | Institutional control console requiring `X-Admin-Token` to audit students, curate the skill taxonomy, and moderate reviews. |

---

## 3. Backend Architecture & Package Structure (`SkillHub-main/skillhub/`)

The backend follows an enterprise **Layered Three-Tier Architecture** (Presentation Layer $\rightarrow$ Business Logic Layer $\rightarrow$ Data Access Layer $\rightarrow$ Database):

```
SkillHub-main/skillhub/src/main/
├── java/com/skillhub/
│   │
│   ├── SkillHubApplication.java   # Main Spring Boot Application entry point (@SpringBootApplication)
│   │
│   ├── config/                    # Configuration Components
│   │   ├── CorsConfig.java        # Global CORS configuration enabling cross-origin requests
│   │   └── DataInitializer.java   # Auto-seeds default skills (Java, Python, etc.) and demo profiles on startup
│   │
│   ├── controller/                # REST Controller Layer (@RestController, HTTP request mapping)
│   │   ├── StudentController.java         # /students       -> Register, Login, Profile CRUD
│   │   ├── SkillController.java           # /skills         -> Add, Search, Update, Delete
│   │   ├── StudentSkillController.java    # /student-skills -> Map skills to student with proficiency
│   │   ├── LearningRequestController.java # /requests       -> Send request, Accept, Reject, Complete
│   │   ├── RatingController.java          # /ratings        -> Submit 5-star ratings & peer feedback
│   │   └── AdminController.java           # /admin          -> Token-secured administrative oversight
│   │
│   ├── service/                   # Business Logic Layer (@Service, state transitions & rules)
│   │   ├── StudentService.java            # Registration logic, credential validation, profile updates
│   │   ├── SkillService.java              # Taxonomy management, keyword search filtering
│   │   ├── StudentSkillService.java       # Mentor skill association and student-specific skill queries
│   │   ├── LearningRequestService.java    # Request status lifecycle transitions & DTO conversions
│   │   └── RatingService.java             # Rating calculations and peer feedback persistence
│   │
│   ├── repository/                # Data Access Layer (Spring Data JPA interfaces)
│   │   ├── StudentRepository.java         # Query methods by email, studentId
│   │   ├── SkillRepository.java           # Case-insensitive skill search queries
│   │   ├── StudentSkillRepository.java    # Student-to-skill junction queries
│   │   ├── LearningRequestRepository.java # Learner & mentor request queue lookups
│   │   └── RatingRepository.java          # Mentor rating queries and aggregations
│   │
│   ├── entity/                    # JPA Entity Models (@Entity, Hibernate ORM mapping to MySQL)
│   │   ├── Student.java           # students table (student_id, name, email, password, department, year)
│   │   ├── Skill.java             # skills table (skill_id, skill_name, category)
│   │   ├── StudentSkill.java      # student_skills junction table (student_id, skill_id, level)
│   │   ├── LearningRequest.java   # learning_requests table (learner_id, mentor_id, skill_id, status, message)
│   │   └── Rating.java            # ratings table (mentor_id, learner_id, rating, feedback)
│   │
│   ├── dto/                       # Data Transfer Objects (Payload encapsulation & circular-reference protection)
│   │   ├── StudentDTO.java        # Safe public student representation
│   │   ├── LoginDTO.java          # Email & password payload
│   │   ├── SkillDTO.java          # Skill metadata payload
│   │   ├── LearningRequestDTO.java# Request representation with explicit IDs avoiding JPA recursion
│   │   ├── RatingDTO.java         # Rating submission payload
│   │   └── AdminLoginDTO.java     # Admin authentication credentials
│   │
│   ├── enums/                     # Enumerated Types
│   │   └── RequestStatus.java     # PENDING, ACCEPTED, REJECTED, COMPLETED
│   │
│   └── exception/                 # Centralized Error Handling
│       ├── GlobalExceptionHandler.java    # @RestControllerAdvice converting exceptions to standard JSON envelopes
│       └── ResourceNotFoundException.java # Custom HTTP 404 exception for missing entities
│
└── resources/
    ├── application.properties     # Database URL, credentials, server.port=8081, admin tokens, live cache control
    └── static/                    # Embedded frontend files directly served by Spring Boot at http://localhost:8081/
        ├── index.html, login.html, register.html, etc.
        └── assets/ (css, js)
```

---

## 4. Database Relational Persistence Layer

The MySQL relational database (`skillhub`) enforces 3rd Normal Form (3NF) and cascading constraints across 5 primary tables:

```
  ┌──────────────┐          1:N          ┌───────────────────┐
  │   STUDENTS   ├──────────────────────<┤   STUDENT_SKILLS  │
  └──────┬───────┘                       └─────────┬─────────┘
         │                                         │
         │ 1:N (Learner / Mentor)                  │ N:1
         ▼                                         ▼
  ┌──────────────┐          N:1          ┌───────────────────┐
  │LEARNING_REQS ├───────────────────────┤      SKILLS       │
  └──────┬───────┘                       └───────────────────┘
         │ 1:1
         ▼
  ┌──────────────┐
  │   RATINGS    │
  └──────────────┘
```

| Table Name | Primary Key | Foreign Keys | Key Attributes |
| :--- | :--- | :--- | :--- |
| **`students`** | `student_id` | — | `name`, `email` (UK), `password`, `department`, `year` |
| **`skills`** | `skill_id` | — | `skill_name` (UK), `category` |
| **`student_skills`** | `id` | `student_id`, `skill_id` | `level` (`Beginner`, `Intermediate`, `Advanced`) |
| **`learning_requests`** | `request_id` | `learner_id`, `mentor_id`, `skill_id` | `status` (`PENDING`, `ACCEPTED`, `REJECTED`, `COMPLETED`), `message` |
| **`ratings`** | `rating_id` | `mentor_id`, `learner_id` | `rating` (1–5), `feedback` |

---

## 5. Integration & Data Flow

```
┌────────────────────────────────────────────────────────┐
│             Client Layer (Browser / Postman)           │
│   • Responsive Bootstrap 5.3 UI                        │
│   • Asynchronous ES6 API Client (assets/js/api.js)     │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP JSON / REST
┌───────────────────────────▼────────────────────────────┐
│         REST Controller Layer (@RestController)        │
│   /students  •  /skills  •  /student-skills            │
│   /requests  •  /ratings •  /admin                     │
└───────────────────────────┬────────────────────────────┘
                            │ DTOs & Validation
┌───────────────────────────▼────────────────────────────┐
│                   Service Layer                        │
│   • State machine lifecycle (PENDING -> ACCEPTED)      │
│   • Global error handling (@ControllerAdvice)          │
└───────────────────────────┬────────────────────────────┘
                            │ Entities / Transactions
┌───────────────────────────▼────────────────────────────┐
│         Data Access Layer (Spring Data JPA)            │
│   • Interface-driven repositories                      │
│   • Hibernate ORM mapping                              │
└───────────────────────────┬────────────────────────────┘
                            │ JDBC SQL
┌───────────────────────────▼────────────────────────────┐
│              MySQL 8 Relational Database               │
└────────────────────────────────────────────────────────┘
```

1. **Embedded Static Delivery:**
   When accessed via `http://localhost:8081/`, Spring Boot's embedded Tomcat serves the static HTML/CSS/JS assets from `src/main/resources/static/` with zero cross-origin configuration required.
2. **REST API Communication:**
   Frontend interactions invoke asynchronous `fetch()` requests to relative paths (`/students`, `/skills`, `/requests`).
3. **Transactional Safety:**
   The Service layer validates state transitions (e.g., verifying a request is `COMPLETED` before accepting a rating) and commits transactions cleanly via Spring Data JPA.
