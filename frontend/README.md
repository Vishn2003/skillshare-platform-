# 🎓 SkillHub - Frontend Application

A responsive, collegiate peer-to-peer skill exchange web application built using **HTML5, CSS3, Bootstrap 5.3, and Vanilla JavaScript (ES6+)**, integrated directly with the **Spring Boot REST API** and **MySQL** backend.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic, accessible multi-page structure.
- **CSS3**: Custom variables, responsive design, star rating widgets, glassmorphism navbar, and badge styling.
- **Bootstrap 5.3.3**: Modern grid system, responsive tables, cards, modals, form controls, and toasts.
- **Bootstrap Icons (v1.11.3)**: Crisp vector icons.
- **Vanilla JavaScript (ES6+)**: Modular API service layer with `async/await` and `fetch()`, zero external build or bundler dependencies required.

---

## 🚀 How to Run and Access

### Method 1: Directly via Spring Boot (Recommended)
Because the frontend files are placed in `src/main/resources/static/`, Spring Boot automatically serves them:
1. Ensure your Spring Boot backend is running on port **8080**.
2. Open your web browser and go to:
   ```
   http://localhost:8080/
   ```

### Method 2: Standalone / Live Server
You can also open the `frontend/` directory with VS Code Live Server or by opening `index.html` directly:
- The frontend features an automatic connection manager (`assets/js/api.js`) that detects the host and communicates with `http://localhost:8080` with CORS support enabled.
- Real-time status indicator in the top navbar shows **Backend Connected** (green) or **Backend Offline** (red).

---

## 🔑 Fast Demo Login Accounts

Pre-populated accounts in your MySQL database for fast testing:

| Role | Name | Email | Password | Department | Year |
|------|------|-------|----------|------------|------|
| **Mentor** | Rahul | `rahul@gmail.com` | `1234` | CSE | 3rd Year |
| **Learner** | Arun | `arun@gmail.com` | `1234` | IT | 2nd Year |

> You can also register any new student directly via the **Register** page!

---

## 📄 Application Pages & API Integration

| Page | File | Description & API Endpoints |
|------|------|-----------------------------|
| **Home / Landing** | `index.html` | Hero banner, live platform counters, 4-step process guide, skills catalog preview (`GET /students`, `GET /skills`, `GET /student-skills`, `GET /requests`). |
| **Student Login** | `login.html` | Authentication form with password visibility toggle and 1-click demo login buttons (`POST /students/login`). |
| **Registration** | `register.html` | Student onboarding with department & year dropdowns, password validation, and auto-login (`POST /students/register`). |
| **Dashboard** | `dashboard.html` | Personalized student dashboard: live statistics, pending incoming mentor requests with 1-click Accept/Reject, outgoing learner requests, and offered skills preview (`GET /requests/mentor/{id}`, `GET /requests/learner/{id}`, `GET /student-skills/student/{id}`, `GET /ratings/mentor/{id}`). |
| **Explore Skills** | `explore-skills.html` | Searchable campus mentor & skill directory. Filter by keyword, category, proficiency level (`Beginner`, `Intermediate`, `Advanced`). Send learning request modal (`GET /skills`, `GET /student-skills`, `POST /requests`). |
| **My Skills** | `my-skills.html` | Manage skills the logged-in student teaches. Select from catalog or create a brand new skill, assign proficiency level, and remove offerings (`GET/POST/DELETE /student-skills`, `POST /skills`). |
| **Requests Hub** | `requests.html` | Dual-tab manager for incoming mentorship requests and outgoing learning requests. Accept, decline, or complete requests (`PUT /requests/{id}/status?status=ACCEPTED\|REJECTED\|COMPLETED`, `DELETE /requests/{id}`). |
| **Sessions Tracker** | `sessions.html` | Track ongoing accepted exchanges and completed learning sessions (`GET /requests/mentor/{id}`, `GET /requests/learner/{id}`). |
| **Ratings & Reviews** | `reviews.html` | View mentorship ratings and reviews. Interactive 5-star rating submission modal for completed learning sessions (`GET /ratings`, `POST /ratings`). |
| **Profile & Settings** | `profile.html` | View/update student name, email, department, year of study, password, and delete account (`GET/PUT/DELETE /students/{id}`). |
| **Admin Console** | `admin.html` | Administrative dashboard with full platform oversight and management of students, skills catalog, requests, and ratings (`GET /admin/students`, `GET /admin/skills`, `GET /admin/requests`, `GET /admin/ratings`). |

---

## 📁 File Structure

```
frontend/
├── assets/
│   ├── css/
│   │   └── style.css       # Custom design system, badges, and layout overrides
│   └── js/
│       ├── api.js          # REST client, session storage & toast alerts
│       └── app.js          # Universal navbar, footer, and health monitor
├── index.html              # Landing page
├── login.html              # Login page with demo shortcuts
├── register.html           # Registration form
├── dashboard.html          # Student dashboard
├── explore-skills.html     # Mentors & skills discovery hub
├── my-skills.html          # Teacher / Mentor offerings manager
├── requests.html           # Learning requests hub (incoming & outgoing)
├── sessions.html           # Active & completed sessions tracker
├── reviews.html            # Star ratings & peer feedback
├── profile.html            # Profile edit & settings
├── admin.html              # Database admin console
└── README.md
```

