# ⚙️ Internship Management System - Backend

This is the **backend service** for the **Internship Management System (IMS)**.  
It provides a secure REST API built with **Node.js, Express, and MongoDB**, handling all business logic, authentication, and data persistence.

---

## 🚀 Features
- **JWT Authentication** for Admins & Interns.  
- **Role-based Access Control** (Admins manage, Interns apply).  
- **Internship & Task Management** with deadlines.  
- **Secure Submissions** (links/files).  
- **Validation Middlewares** to enforce business rules (e.g., one active internship per intern).  
- **Hashing & Token Utilities** for secure data handling.  
- **Modular Architecture** for scalability and easy maintenance.  

---

## 🏗️ Folder Structure
```
backend/
│
├── server.js # Entry point for the application
│
├── config/ # Configuration files
│ ├── db.js # Database connection (MongoDB)
│ └── upload.js # (Optional) file upload config for future features
│
├── models/ # Mongoose models (schemas)
│ ├── User.js
│ ├── Internship.js
│ ├── Application.js
│ ├── Task.js
│ ├── Submission.js
│ └── Feedback.js
│
├── controllers/ # Request handlers (business logic)
│ ├── authController.js
│ ├── userController.js
│ ├── internshipController.js
│ ├── taskController.js
│ └── submissionController.js
│
├── routes/ # API route definitions
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── internshipRoutes.js
│ ├── taskRoutes.js
│ └── submissionRoutes.js
│
├── lib/
│ ├── middlewares/ # Custom middlewares
│ │ ├── authMiddleware.js # Auth middleware (JWT verify, role check)
│ │ 
│ │
│ ├── validations/ # Business rule validators
│ │ ├── validateAdminCreation.js # Allow new admin creation only by admin
│ │ └── validateUserCreation.js # Ensure Proper correct data is sended by user
│ │
│ └── utils/ # Utility functions
│ ├── compareHash.js
│ ├── generateHash.js
│ └── generateToken.js
│ └── handleApply.js (This function checks user record to prevent and make sure that user is enrolled in only one internship at a time)
├── Dockerfile (A file which will help to create images for your backend)
└── package.json

```

---

## 🔑 Authentication & Authorization
- **JWT-based authentication**: Tokens are issued on login and validated for every protected route.  
- **Role-based authorization**:  
  - *Admin*: Can manage internships, tasks, and intern applications.  
  - *Intern*: Can apply, view tasks, submit work, and receive feedback.  

---

## ⚡ API Overview

### Auth Routes
- `POST /api/auth/register` – Register new user (Intern or Admin by existing admin only).  
- `POST /api/auth/login` – Login and receive JWT token.  

### Internship Routes
- `POST /api/internships` – Create internship (Admin only).  
- `GET /api/internships` – Get available internships.  
- `POST /api/internships/apply/:id` – Apply to internship (Intern only).  

### Task Routes
- `POST /api/tasks` – Assign task to intern (Admin).  
- `GET /api/tasks/:internId` – View assigned tasks (Intern).  

### Submission Routes
- `POST /api/submissions` – Submit work (Intern).  
- `PUT /api/submissions/:id` – Update submission (Intern).  
- `PATCH /api/submissions/review/:id` – Accept/Reject submission with feedback (Admin).  

*(Full API documentation can be added later using Swagger/Postman collections.)*  

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 16  
- MongoDB Atlas (or local MongoDB instance)  

### Installation
1. Navigate to the backend folder:
   ```bash
   cd IMS/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```  
3. Start the server:
   ```bash
   nodemon server.js




   