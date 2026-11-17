# 🎓 SkillHub — Campus Peer-to-Peer Skill Exchange Platform

[![Java](https://img.shields.io/badge/Java-21%20LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Hibernate](https://img.shields.io/badge/Hibernate-JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)](https://hibernate.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> A full-stack, distributed web platform and RESTful service designed to democratize campus learning. **SkillHub** enables students to exchange knowledge without financial tuition barriers by connecting peer mentors with learners, tracking live exchange sessions, launching virtual meetings, and cultivating trust through peer reviews.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Schema (ER Model)](#-database-schema-er-model)
- [REST API Reference](#-rest-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#1-database-setup)
  - [Configure Application Properties](#2-configure-application-properties)
  - [Build and Run](#3-build-and-run)
- [Fast Demo Accounts](#-fast-demo-accounts)
- [Testing 2 Accounts Simultaneously](#-testing-2-accounts-simultaneously-side-by-side)
- [Project Directory Structure](#-project-directory-structure)
- [License](#-license)

---

## 🚀 Overview

In modern university environments, students often encounter challenges mastering new programming languages, frameworks, or academic subjects. While commercial tutoring bootcamps charge steep fees, talented peers on the same campus have already mastered these subjects.

**SkillHub** transforms the student body into an interconnected academic collective:
- **Zero Financial Cost:** 100% free peer-driven skill exchange.
- **Bi-Directional Learning:** A student can mentor someone in Java while receiving mentorship in React or UI/UX Design from another peer.
- **Structured Request Lifecycle:** State-machine transitions (`PENDING` $\rightarrow$ `ACCEPTED` / `REJECTED` $\rightarrow$ `COMPLETED`).
- **Instant Meeting Launch:** Integrated 1-click **Google Meet** room creation and direct campus email dispatch.
- **Reputational Accountability:** Post-session 5-star ratings and written reviews prevent spam and reward top mentors.

---

## ✨ Key Features

### 👤 1. Student Onboarding & Profiles
- Register with name, campus email, academic department, and study year.
- Seamless authentication with real-time session management.
- Profile management with account edit and delete capabilities.

### 📚 2. Campus Skills Catalog
- Searchable directory of campus skills (Programming, Web Dev, AI/ML, Design, Cloud & DevOps).
- Dynamic keyword search and category filtering.
- Mentors can choose skills from the catalog or propose new subjects.

### 🤝 3. Mentorship Offerings & Proficiency Levels
- Students tag skills they teach with proficiency badges: `Beginner`, `Intermediate`, or `Advanced / Expert`.
- Multiple skill mappings per student with instant activation in the public campus catalog.

### 🔄 4. Requests Hub & Lifecycle Manager
- **Send Requests:** Learners send targeted exchange requests with customized learning goals.
- **Mentor Decisions:** Mentors accept or decline incoming requests from their personalized dashboard.
- **Status Machine:** Visual status badges (`PENDING`, `ACCEPTED`, `REJECTED`, `COMPLETED`).

### 📹 5. Live Sessions Tracker & Virtual Meeting Hub
- Track active and past learning sessions in real-time.
- **1-Click Google Meet Launch:** Start an instant meeting room (`https://meet.google.com/new`) directly from the session card.
- **Pre-filled Campus Email:** Direct `mailto:` action with pre-populated subject and message template.

### ⭐ 6. Peer Ratings & Reviews
- Completed sessions unlock 5-star interactive rating modals.
- Mentors accumulate verified average ratings and student testimonials.

### 🛡️ 7. Secured Admin Management Console
- Centralized administration dashboard accessible at `/admin.html`.
- Protected by secure token verification (`X-Admin-Token`).
- Campus-wide oversight: manage student accounts, curate catalog taxonomy, resolve stalled requests, and moderate ratings.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend Framework** | **Java 21 (LTS)**, **Spring Boot 3.5.16** (Spring MVC, Spring Data JPA, Hibernate ORM) |
| **Database** | **MySQL 8.0** with InnoDB relational storage engine & HikariCP connection pooling |
| **Frontend** | **HTML5**, **CSS3 (Custom Design System)**, **Bootstrap 5.3.3**, **Bootstrap Icons 1.11.3** |
| **Client Layer** | **Vanilla JavaScript (ES6+)** with native `fetch()` REST API client & real-time connection monitor |
| **Build Tool** | **Apache Maven 3.9** (Maven Wrapper `./mvnw` included) |
| **Testing** | Postman, JUnit, automated end-to-end REST test scripts |

---

## 🏗️ System Architecture

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
                            │ DTOs & Domain Models
┌───────────────────────────▼────────────────────────────┐
│                   Service Layer                        │
│   • Business logic & state-machine transitions         │
│   • Input validation & @ControllerAdvice exception handling
└───────────────────────────┬────────────────────────────┘
                            │ Entities / Transactions
┌───────────────────────────▼────────────────────────────┐
│         Data Access Layer (Spring Data JPA)            │
│   • Hibernate ORM mapping                              │
└───────────────────────────┬────────────────────────────┘
                            │ JDBC SQL
┌───────────────────────────▼────────────────────────────┐
│              MySQL 8 Relational Database               │
└────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema (ER Model)

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

---

## 📡 REST API Reference

### Student Endpoints
| Verb | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/students/register` | Register new student profile |
| `POST` | `/students/login` | Authenticate credentials & retrieve profile |
| `GET` | `/students` | Get all active students |
| `GET` | `/students/{id}` | Get student details by ID |
| `PUT` | `/students/{id}` | Update student profile information |
| `DELETE` | `/students/{id}` | Delete student account |

### Skill Catalog Endpoints
| Verb | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/skills` | Fetch all catalog skills |
| `POST` | `/skills` | Add new skill to global catalog |
| `GET` | `/skills/{id}` | Get skill by ID |
| `GET` | `/skills/search?name={keyword}` | Search skills by name |
| `PUT` | `/skills/{id}` | Update skill metadata |
| `DELETE` | `/skills/{id}` | Delete unused skill |

### Student-Skill Mappings
| Verb | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/student-skills` | Map a skill offering to a student with proficiency |
| `GET` | `/student-skills` | List all campus offerings |
| `GET` | `/student-skills/student/{id}` | List skills taught by a specific student |
| `DELETE` | `/student-skills/{id}` | Remove a mentorship offering |

### Learning Request Lifecycle
| Verb | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/requests` | Create learning request (`PENDING`) |
| `GET` | `/requests` | Get all platform requests |
| `GET` | `/requests/learner/{id}` | Get requests sent by learner |
| `GET` | `/requests/mentor/{id}` | Get incoming requests for mentor |
| `PUT` | `/requests/{id}/status?status=ACCEPTED` | Mentor accepts request |
| `PUT` | `/requests/{id}/status?status=REJECTED` | Mentor declines request |
| `PUT` | `/requests/{id}/status?status=COMPLETED` | Mark session completed |
| `DELETE` | `/requests/{id}` | Delete / cancel request |

### Rating & Reviews
| Verb | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/ratings` | Submit post-session 5-star evaluation & review |
| `GET` | `/ratings` | Get all platform reviews |
| `GET` | `/ratings/mentor/{mentorId}` | Get ratings and reviews for a mentor |
| `DELETE` | `/ratings/{id}` | Delete a rating |

### Admin Console (`X-Admin-Token` required)
| Verb | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/admin/login` | Authenticate admin credentials |
| `GET` | `/admin/students` | View all platform student accounts |
| `GET` | `/admin/skills` | Manage and curate master catalog |
| `GET` | `/admin/requests` | Audit all peer exchange transactions |
| `GET` | `/admin/ratings` | Review and moderate peer ratings |

---

## ⚙️ Getting Started

### Prerequisites
- **Java 21 JDK** or newer (`java -version`)
- **MySQL Server 8.0** or newer running on port `3306`
- **Git**

---

### 1. Database Setup

Open MySQL Workbench or your terminal client and create the database:

```sql
CREATE DATABASE skillhub;
```

*(Optional)* Import initial seed tables and pre-configured demo users:
```bash
mysql -u root -p skillhub < SkillHub-main/skillhub.sql
```

---

### 2. Configure Application Properties

Review `SkillHub-main/skillhub/src/main/resources/application.properties` and verify your MySQL password and server port:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillhub
spring.datasource.username=root
spring.datasource.password=root

server.port=8081

# Admin Security Configuration
admin.username=admin
admin.password=Admin@SkillHub2026
admin.token=skillhub-admin-secure-token-883921
```

---

### 3. Build and Run

Navigate into the Spring Boot project directory:

```bash
cd SkillHub-main/skillhub
```

**On Windows:**
```powershell
.\mvnw.cmd spring-boot:run
```

**On Linux / macOS:**
```bash
./mvnw spring-boot:run
```

Once started, open your web browser and visit:
👉 **[http://localhost:8081/](http://localhost:8081/)**

---

## 🔑 Fast Demo Accounts

The database comes pre-seeded with test accounts for quick evaluation:

| Role | Name | Email | Password | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Mentor** | Rahul | `rahul@gmail.com` | `1234` | CSE • Year 3 (Teaches Java & Spring Boot) |
| **Learner** | Arun | `arun@gmail.com` | `1234` | IT • Year 2 (Learning Java) |
| **Admin** | Administrator | `admin` | `Admin@SkillHub2026` | Admin Console: `/admin.html` |

---

## 👥 Testing 2 Accounts Simultaneously (Side-by-Side)

To test the entire live exchange lifecycle (sending a request, accepting it, and launching a meeting):

1. **Window 1 (Normal Browser):** Go to `http://localhost:8081/login.html` and sign in as **Rahul (Mentor)**.
2. **Window 2 (Incognito / Private Window - `Ctrl+Shift+N`):** Go to `http://localhost:8081/login.html` and sign in as **Arun (Learner)**.
3. **In Window 2:** Navigate to **Campus Catalog**, find Rahul, and send a swap request.
4. **In Window 1:** Open **Requests Hub**, click **`Accept`**.
5. **In Both Windows:** Open **[Sessions Tracker](http://localhost:8081/sessions.html)**:
   - Click **`[Start Google Meet]`** to launch a live video meeting!
   - Click **`[Mark Completed]`** and submit a 5-star review from the learner window.

---

## 📁 Project Directory Structure

```
SkillHub/
├── README.md                                # Project master documentation
├── .gitignore                               # Git ignore configuration
├── frontend/                                # Standalone web client files
│   ├── assets/
│   │   ├── css/style.css                    # Design system & responsive overrides
│   │   └── js/
│   │       ├── api.js                       # Centralized REST API client & auth
│   │       └── app.js                       # Universal navbar, footer, & connection monitor
│   ├── index.html                           # Landing page & hero section
│   ├── login.html                           # Student login with fast demo autofill
│   ├── register.html                        # Student registration
│   ├── dashboard.html                       # Personalized student dashboard
│   ├── explore-skills.html                  # Searchable campus catalog & request modal
│   ├── my-skills.html                       # Mentor skill publishing hub
│   ├── requests.html                        # Incoming/outgoing requests hub
│   ├── sessions.html                        # Active sessions with Google Meet launch
│   ├── reviews.html                         # Star ratings & reviews manager
│   ├── profile.html                         # Student profile editor
│   └── admin.html                           # Token-protected admin console
│
└── SkillHub-main/
    ├── skillhub.sql                         # MySQL database schema & seed data
    └── skillhub/                            # Spring Boot application
        ├── pom.xml                          # Maven build dependencies
        ├── mvnw / mvnw.cmd                  # Maven wrappers
        └── src/main/
            ├── java/com/skillhub/
            │   ├── controller/              # REST controllers
            │   ├── service/                 # Business logic services
            │   ├── repository/              # Spring Data JPA repositories
            │   ├── entity/                  # JPA entity definitions
            │   ├── dto/                     # Data Transfer Objects
            │   ├── exception/               # Global exception handlers
            │   ├── enums/                   # RequestStatus enum
            │   └── SkillHubApplication.java # Spring Boot main entry point
            └── resources/
                ├── application.properties   # Database, port, & admin configurations
                └── static/                  # Embedded frontend served by Spring Boot
```

---

## 📄 License

This project is developed for educational and academic purposes under the [MIT License](LICENSE).
