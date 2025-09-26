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
│ │ ├── User/ # Intern-specific pages (tasks, submissions, progress)
│ │ └── common/ # Common pages for admin and internee only data is different
│ │ └── auth/ # Auth pages like login and register
| | 
│ │ ├── NotFoundPage.js # 404 page
│ │ ├── Home.js # Landing page
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

```

---

## 🔑 Authentication & Routing
- **AuthContext** manages user login state, JWT token storage, and logout functionality.  
- **ProtectedRoutes** ensures only authorized users can access admin/intern dashboards.  
- **Role-based Navigation**:  
  - Admins see task management, intern approvals, and performance dashboard.  
  - Interns see assigned tasks, submission forms, and feedback.  
  - Public users can view Home Page and login/register to get started. 

---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 16  
- Backend API running locally or deployed  

### Installation
1. Navigate to the frontend folder:
   ```bash
   cd IMS/frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
4. Open your browser and navigate to http://localhost:3000

---

#Future Improvements
- Implement file upload for submissions (optional)
- Add pagination for large lists (optional)
- Add error handling for API requests (optional)

#Acknowledgements
- This project is a part of my virtual internship at Internee.pk (https://internee.pk/).

#Contact
- Email: [alikhandevs@gmail.com](mailto:alikhandevs@gmail.com)

#License
This project is licensed under the [MIT License](LICENSE).