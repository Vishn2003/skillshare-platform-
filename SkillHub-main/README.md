# 🚀 SkillHub - Backend Skill Exchange Platform

SkillHub is a backend REST API application developed using **Spring Boot**, **Hibernate (JPA)**, and **MySQL**. The platform enables students to exchange skills by connecting learners with mentors, managing learning requests, and rating completed learning sessions.

---

# 📌 Project Overview

SkillHub provides a backend system where students can:

- Register and manage their profiles
- Add skills they can teach
- Search available skills
- Send learning requests to mentors
- Accept, reject, or complete requests
- Rate completed learning sessions
- Manage the platform through admin APIs

The application follows a layered architecture using REST APIs and is tested using **Postman**.

---

# 🛠️ Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA (Hibernate)
- MySQL
- Maven
- REST API
- Postman

---

# 🏗️ Project Architecture

```
Client (Postman)

        │

REST APIs

        │

Controller Layer

        │

Service Layer

        │

Repository Layer

        │

Hibernate (JPA)

        │

MySQL Database
```

---

# 📂 Project Structure

```
src
└── main
    ├── java
    │   └── com.skillhub
    │       ├── controller
    │       ├── service
    │       ├── repository
    │       ├── entity
    │       ├── dto
    │       ├── exception
    │       ├── enums
    │       └── SkillHubApplication
    │
    └── resources
        └── application.properties
```

---

# ✨ Features

## Student Module

- Register Student
- Login
- Get Student Details
- Update Student
- Delete Student

---

## Skill Module

- Add Skill
- View Skills
- Search Skill
- Update Skill
- Delete Skill

---

## Student Skill Module

- Map Skills to Students
- View Student Skills
- Delete Student Skill

---

## Learning Request Module

- Send Learning Request
- View Requests
- Accept Request
- Reject Request
- Complete Request

---

## Rating Module

- Submit Rating
- View Ratings

---

## Admin Module

- View All Students
- View All Skills
- View All Requests
- View All Ratings

---

# 🗄️ Database Tables

- Students
- Skills
- Student_Skills
- Learning_Requests
- Ratings

---

# 🔗 Entity Relationships

```
Student
   │
   ├──────────────┐
   │              │
StudentSkill   LearningRequest
   │              │
   │              │
  Skill        Rating
```

---

# 📡 REST API Endpoints

## Student APIs

| Method | Endpoint |
|---------|----------|
| POST | /students/register |
| POST | /students/login |
| GET | /students |
| GET | /students/{id} |
| PUT | /students/{id} |
| DELETE | /students/{id} |

---

## Skill APIs

| Method | Endpoint |
|---------|----------|
| POST | /skills |
| GET | /skills |
| GET | /skills/{id} |
| GET | /skills/search?name=Java |
| PUT | /skills/{id} |
| DELETE | /skills/{id} |

---

## Student Skill APIs

| Method | Endpoint |
|---------|----------|
| POST | /student-skills |
| GET | /student-skills |
| GET | /student-skills/student/{id} |
| DELETE | /student-skills/{id} |

---

## Learning Request APIs

| Method | Endpoint |
|---------|----------|
| POST | /requests |
| GET | /requests |
| GET | /requests/learner/{id} |
| GET | /requests/mentor/{id} |
| PUT | /requests/{id}/accept |
| PUT | /requests/{id}/reject |
| PUT | /requests/{id}/complete |

---

## Rating APIs

| Method | Endpoint |
|---------|----------|
| POST | /ratings |
| GET | /ratings |
| GET | /ratings/mentor/{id} |

---

## Admin APIs

| Method | Endpoint |
|---------|----------|
| GET | /admin/students |
| GET | /admin/skills |
| GET | /admin/requests |
| GET | /admin/ratings |

---

# 🛡️ Project Highlights

- Layered Architecture
- Spring Data JPA
- Hibernate ORM
- MySQL Integration
- DTO Implementation
- Global Exception Handling
- Input Validation
- ResponseEntity Usage
- Enum-based Request Status
- RESTful API Design

---

# ⚙️ How to Run

## Clone the Repository

```bash
git clone <repository-url>
```

---

## Configure Database

Create a MySQL database.

```sql
CREATE DATABASE skillhub;
```

Update `application.properties`.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillhub
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## Run Application

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

## Test APIs

Use **Postman** to test all REST endpoints.

---

# 📈 Future Enhancements

- React Frontend
- JWT Authentication
- Role-Based Authorization
- Email Notifications
- Skill Recommendations
- Search Filters
- Pagination
- Docker Deployment
- Cloud Deployment (AWS)

---



---

# 📄 License

This project is developed for educational purposes.