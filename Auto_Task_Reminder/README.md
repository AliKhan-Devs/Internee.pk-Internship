# 📋 Auto Task Reminder

A simple yet powerful **MERN Stack** application that allows users to create, manage, and receive reminders for their tasks based on date and time. This project demonstrates fundamental CRUD operations integrated with scheduling capabilities.

---

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks seamlessly.
- **Date & Time Scheduling**: Set specific reminders for your tasks.
- **Task Organization**: Add tags and descriptions to keep tasks organized.
- **Task Status Tracking**: Mark tasks as done or pending.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI.
- **Real-time Updates**: Instant UI updates with React's state management.

---

## 🏗️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + React Router  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Local or Atlas)  
- **HTTP Client**: Axios  
- **Server Utilities**: Morgan (logging), CORS  
- **Task Scheduling**: Cron Jobs (for future enhancements)

---

## 📂 Project Structure

```
Auto_Task_Reminder/
│
├── README.md # Project documentation
├── package.json # Root dependencies and scripts
├── docker-compose.yml # (Optional) Docker setup for containerization
│
├── server/ # Backend API
│ ├── app.js # Express app setup
│ ├── index.js # Entry point
│ ├── config.js # Configuration (port, env variables)
│ ├── database.js # MongoDB connection
│ │
│ ├── models/
│ │ └── task.js # Task schema
│ │
│ ├── routes/
│ │ └── tasks.routes.js # Task API routes
│ │
│ └── controller/
│ └── tasks.controller.js # Task business logic
│
└── client/ # Frontend React app
 ├── package.json # Client dependencies
 ├── vite.config.js # Vite configuration
 ├── tailwind.config.js # Tailwind CSS setup
 ├── index.html # Main HTML file
 │
 ├── src/
 │ ├── App.jsx # Main app component with routing
 │ ├── main.jsx # React entry point
 │ ├── index.css # Global styles
 │ │
 │ ├── pages/
 │ │ ├── HomePage.jsx # Display all tasks
 │ │ └── TaskFormPage.jsx # Create/Edit task form
 │ │
 │ ├── components/
 │ │ └── TaskCard.jsx # Individual task display component
 │ │
 │ └── api/
 │ └── task.api.js # API service functions
 │
 └── public/ # Static assets
```

---

## ⚡ API Overview

### Task Routes
All endpoints are prefixed with `/api/tasks`

- `GET /api/tasks` – Retrieve all tasks  
- `GET /api/tasks/:id` – Get a specific task by ID  
- `POST /api/tasks` – Create a new task  
  - Body: `{ title, description, tags?, date? }`
- `PUT /api/tasks/:id` – Update an existing task  
  - Body: `{ title?, description?, done?, tags?, date? }`
- `DELETE /api/tasks/:id` – Delete a task  

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- MongoDB (local instance or MongoDB Atlas)  
- npm or pnpm  

### Backend Setup

1. Navigate to the project root:
   ```bash
   cd Auto_Task_Reminder
   ```

2. Install root dependencies:
   ```bash
   npm install
   ```

3. Update MongoDB URI in `server/database.js` if using Atlas or different host:
   ```javascript
   const URI = "mongodb://localhost/mern-crud-test"; // or your Atlas URI
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or Vite's configured port)

---

## 🚀 Quick Start (Docker)

To run both backend and frontend using Docker:

```bash
docker-compose up --build
```

This will start:
- **Backend** on `http://localhost:4000`
- **Frontend** on `http://localhost:3000` (or as configured)

---

## 📦 Build for Production

To build the frontend for production:

```bash
npm run build
```

This creates an optimized build in the `client/dist` folder.

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from root directory
2. **Start Frontend**: `npm run dev` from client directory
3. **Make Changes**: Edit components, routes, or controllers
4. **Hot Reload**: Changes automatically reflect in the browser
5. **Test API**: Use Postman or curl to test endpoints

---

## 📚 Detailed Documentation

For detailed setup and development instructions, see:
- **[Backend Documentation](./server/README.md)** - API endpoints, configuration, and backend setup
- **[Frontend Documentation](./client/README.md)** - Components, routing, and frontend setup

---

## 🎯 Future Enhancements

- Implement **Cron Jobs** for automatic task reminders
- Add **Email Notifications** when task reminder time arrives
- Implement **User Authentication** (separate user accounts)
- Add **Task Priority Levels** (High, Medium, Low)
- Add **Recurring Tasks** functionality
- Implement **Task Categories** for better organization
- Add **Search & Filter** capabilities
- Add **Dark Mode Toggle** (Tailwind already supports this)

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙋 Support

For issues or questions, feel free to reach out or create an issue in the repository.

---

**Built as a learning project to understand the MERN Stack fundamentals.**
