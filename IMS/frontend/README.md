# 🎨 Internship Management System - Frontend

This is the **frontend application** for the **Internship Management System (IMS)**.  
It is built with **React (CRA)** and styled using **Tailwind CSS**, providing separate dashboards and views for **Admins** and **Interns**, as well as public pages for unauthenticated users.  

---

## 🚀 Features
- **Role-based Dashboards**: Separate layouts and pages for Admins, Interns, and Public (non-logged in) users.  
- **Protected Routes**: Authenticated routes secured via `ProtectedRoutes` component.  
- **Authentication Context**: Global state management for user login/logout and token persistence.  
- **Reusable Layouts**:  
  - Public layout (for visitors & applicants).  
  - Logged-in layout with header and sidebar (for Admin/Interns).  
- **Service Layer**: Centralized API service functions (`services/`) to interact with backend endpoints.  
- **Responsive Design** with Tailwind CSS.  

---

## 🏗️ Folder Structure

```
frontend/
│
├── src/
│ ├── components/
│ │ ├── ProtectedRoutes.js # Secures private routes
│ │ └── layouts/
│ │ ├── Header.js # Common header
│ │ ├── Sidebar.js # Sidebar for logged-in users
│ │ ├── Layout.js # Dashboard layout for logged-in users
│ │ └── PublicLayout.js # Layout for public pages
│ │
│ ├── context/
│ │ └── AuthContext.js # Manages authentication state
│ │
│ ├── pages/
│ │ ├── admin/ # Admin-specific pages (manage interns, tasks, etc.)
│ │ ├── intern/ # Intern-specific pages (tasks, submissions, progress)
│ │ └── public/ # Public pages (home, login, register, apply internship)
│ │
│ ├── services/
│ │ ├── api.js # Axios instance & base API setup
│ │ ├── authService.js # Auth-related API calls
│ │ ├── internshipService.js # Internship-related API calls
│ │ ├── taskService.js # Task-related API calls
│ │ └── submissionService.js # Submission & feedback API calls
│ │
│ ├── App.js
│ ├── index.js
│ └── ...
│
└── package.json