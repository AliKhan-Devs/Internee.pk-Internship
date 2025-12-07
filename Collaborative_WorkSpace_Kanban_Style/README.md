# 📊 Collaborative WorkSpace Kanban Style

A modern **full-stack MERN** application for collaborative task management with a **Kanban-style board interface**. Teams can organize tasks into sections, assign work, set deadlines, and collaborate in real-time with drag-and-drop functionality.

---

## 🚀 Features

### 📋 Kanban Board
- **Drag & Drop Tasks**: Intuitive drag-and-drop interface to move tasks between sections.
- **Section Management**: Create, update, and delete task sections (To Do, In Progress, Done, etc.).
- **Real-time Updates**: Changes reflect instantly across the board.

### 👥 Team Collaboration
- **User Authentication**: Secure JWT-based login and registration.
- **Task Assignment**: Assign tasks to team members with role management.
- **User Profiles**: Store user photos and profile information.

### ✅ Task Management
- **Task Details**: Comprehensive task properties (name, description, due date, assignee).
- **Task Operations**: Create, read, update, move, and delete tasks.
- **Due Date Tracking**: Set and monitor task deadlines with date pickers.

### 🔐 Security
- **JWT Authentication**: Token-based user authentication.
- **Password Hashing**: Secure password storage with bcrypt.
- **Protected Routes**: Middleware-based route protection.

---

## 🏗️ Tech Stack

- **Frontend**: React (CRA) + Redux Toolkit + Material-UI (MUI)  
- **Drag & Drop**: React DnD with HTML5 Backend  
- **State Management**: Redux for centralized state  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: JWT (JSON Web Tokens) + bcrypt  
- **HTTP Client**: Axios with interceptors  
- **Date Picker**: MUI Date Pickers + DayJS  
- **File Upload**: Multer for image uploads  

---

## 📂 Project Structure

```
Collaborative_WorkSpace_Kanban_Style/
│
├── backend/ # Node.js + Express API
│ ├── server.js # Entry point
│ ├── package.json # Backend dependencies
│ │
│ └── src/
│ ├── config/
│ │ └── db.config.js # MongoDB connection
│ │
│ ├── features/ # Feature-based folder structure
│ │ ├── sections/
│ │ │ ├── section.model.js # Section schema
│ │ │ ├── section.controller.js # Section logic
│ │ │ └── section.routes.js # Section endpoints
│ │ │
│ │ ├── tasks/
│ │ │ ├── task.model.js # Task schema & methods
│ │ │ ├── task.controller.js # Task logic
│ │ │ └── task.routes.js # Task endpoints
│ │ │
│ │ ├── user/
│ │ │ ├── user.model.js # User schema
│ │ │ ├── user.controller.js # Auth logic
│ │ │ ├── user.service.js # User services
│ │ │ └── user.routes.js # Auth endpoints
│ │ │
│ │ └── utils/
│ │ └── file.utils.js # File upload utilities
│ │
│ └── middlewares/
│ └── jwt.middleware.js # JWT authentication middleware
│
└── frontend/ # React Application
 ├── package.json # Frontend dependencies
 ├── public/
 │ └── index.html # Main HTML file
 │
 └── src/
 ├── App.js # Main app with DnD provider
 ├── index.js # React entry point
 ├── index.css # Global styles
 │
 ├── components/
 │ ├── Board.js # Main Kanban board component
 │ ├── Section.js # Section component
 │ ├── TaskCard.js # Individual task card
 │ ├── TaskForm.js # Create task form
 │ ├── UpdateTaskForm.js # Edit task form
 │ ├── AuthForm.js # Login/Register form
 │ └── LoadingScreen.js # Loading state component
 │
 ├── Axios/
 │ └── api.js # Axios instance with JWT interceptor
 │
 └── store/
 ├── store.js # Redux store configuration
 ├── kanbanSlice.js # Kanban reducer & actions
 └── authSlice.js # Auth reducer & actions
```

---

## ⚡ API Overview

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` – Create new user account
- `POST /api/auth/login` – Login and receive JWT token

### Section Routes (`/api/section`)
- `GET /api/section` – Get all sections
- `POST /api/section` – Create new section
- `PUT /api/section/:id` – Update section
- `DELETE /api/section/:id` – Delete section

### Task Routes (`/api/task`)
- `GET /api/task/:section` – Get tasks in a section
- `POST /api/task` – Create new task
- `PUT /api/task/:taskId` – Update task
- `PATCH /api/task/move` – Move task to different section
- `DELETE /api/task/:taskId` – Delete task

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- MongoDB (local or Atlas)  
- npm or yarn  

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd Collaborative_WorkSpace_Kanban_Style/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost/kanban_db
   PORT=5000
   JWT_SECRET=your_secret_key_here
   ```

4. Update MongoDB URI in `.env` for local or Atlas connection

5. Start backend server:
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd Collaborative_WorkSpace_Kanban_Style/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start frontend development server:
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from backend folder
2. **Start Frontend**: `npm start` from frontend folder
3. **Make Changes**: Edit components, models, or controllers
4. **Test Features**: Use the UI to test Kanban functionality
5. **API Testing**: Use Postman for API endpoint testing

---

## 🎯 Key Features Walkthrough

### Creating a Task
1. User logs in with credentials
2. Creates new section or selects existing one
3. Fills task form (name, description, due date, assignee)
4. Task appears in the section

### Moving Tasks (Drag & Drop)
1. Click and hold a task card
2. Drag to another section
3. Drop to update task section
4. Changes sync with backend

### Managing Sections
1. Add new sections from the board
2. Update section name
3. Delete sections (tasks may be reassigned)

---

## 🔮 Future Enhancements

- Add **Task Priority Levels** (High, Medium, Low)
- Implement **Task Comments & Activity Feed**
- Add **File Attachments** to tasks
- Implement **Team Permissions** (Admin, Manager, Member)
- Add **Task Labels & Filtering**
- Implement **Notifications** for task updates
- Add **Dark Mode** theme toggle
- Create **Task Templates** for recurring work
- Add **Analytics Dashboard** for team metrics
- Implement **Real-time Collaboration** with WebSocket

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙋 Support

For issues or questions, feel free to reach out or create an issue in the repository.

---

**Built as a collaborative task management solution for team productivity.**
