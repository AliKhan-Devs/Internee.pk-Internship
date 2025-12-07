# 🎨 Collaborative WorkSpace - Frontend

This is the **frontend application** for the **Collaborative WorkSpace Kanban Board**.  
Built with **React (CRA)** and **Redux Toolkit**, it provides an interactive Kanban-style task management interface with drag-and-drop functionality, real-time updates, and team collaboration features powered by **Material-UI** components.

---

## 🚀 Features

- **Drag & Drop Board**: Intuitive task movement between sections using React DnD.
- **Redux State Management**: Centralized state for kanban and authentication.
- **JWT Authentication**: Secure login and registration with token persistence.
- **Material-UI Components**: Modern, responsive UI with MUI components.
- **Section Management**: Create, update, and delete task sections.
- **Task Management**: Full CRUD operations for tasks with detailed properties.
- **Date Picker**: MUI Date Pickers for due date selection.
- **API Integration**: Axios with JWT token interceptors for seamless backend communication.
- **Responsive Design**: Mobile-friendly interface that adapts to all screen sizes.
- **Error Handling**: User-friendly error messages and loading states.

---

## 🏗️ Folder Structure

```
frontend/
│
├── package.json # Dependencies and scripts
├── .env # Environment configuration
├── public/
│ └── index.html # Main HTML entry point
│
└── src/
 ├── App.js # Root component with Drag & Drop provider
 ├── index.js # React entry point
 ├── index.css # Global styles
 │
 ├── components/ # Reusable UI components
 │ ├── Board.js # Main Kanban board layout
 │ ├── Section.js # Section container for tasks
 │ ├── TaskCard.js # Individual task card component
 │ ├── TaskForm.js # Form to create new tasks
 │ ├── UpdateTaskForm.js # Form to edit existing tasks
 │ ├── AuthForm.js # Login/Register form
 │ └── LoadingScreen.js # Loading state display
 │
 ├── Axios/
 │ └── api.js # Axios instance with JWT interceptor
 │
 └── store/ # Redux state management
  ├── store.js # Redux store configuration
  ├── kanbanSlice.js # Kanban state & reducers
  └── authSlice.js # Authentication state & reducers
```

---

## 🔑 Key Components

### App.js
- Root component wrapping the entire app
- Provides DnD context using `DndProvider` with HTML5 backend
- Enables drag-and-drop functionality across the application

```jsx
<DndProvider backend={HTML5Backend}>
  <Board />
</DndProvider>
```

### Board Component
- Displays the main Kanban board
- Shows all sections and their tasks
- Handles section creation and management
- Manages task operations

### Section Component
- Represents a task column/section
- Accepts dropped tasks via DnD
- Displays tasks within the section
- Allows section updates and deletion

### TaskCard Component
- Individual task display with drag handle
- Shows task details (name, description, assignee, due date)
- Provides task edit and delete actions
- Draggable to different sections

### TaskForm & UpdateTaskForm
- Forms for creating and editing tasks
- Fields: name, description, due date, assignee, section
- Date picker using MUI X Date Pickers
- Form submission handlers with validation

### AuthForm Component
- Login and registration interface
- Toggle between login and register modes
- Handles user credentials
- JWT token storage on successful auth

---

## 📦 Redux Store Structure

### Store Configuration (`store.js`)
```javascript
{
  reducer: {
    kanban: kanbanSlice,    // Board and task state
    auth: authSlice         // User authentication state
  }
}
```

### Kanban Slice (`kanbanSlice.js`)
```javascript
{
  sections: [],           // Array of section objects
  tasks: {},              // Tasks organized by section
  selectedSection: null,  // Currently selected section
  loading: false,         // Loading state
  error: null            // Error messages
}
```

### Auth Slice (`authSlice.js`)
```javascript
{
  user: null,             // Current user object
  token: null,            // JWT token
  isAuthenticated: false, // Auth status
  loading: false,         // Loading state
  error: null            // Error messages
}
```

---

## 🌐 API Integration

### Axios Configuration (`Axios/api.js`)

```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// JWT Token Interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

The interceptor automatically adds the JWT token to all requests from localStorage.

---

## 🎯 User Workflows

### Authentication Workflow
1. User opens app and sees AuthForm
2. Registers with name, email, password
3. Or logs in with existing credentials
4. Backend returns JWT token
5. Token stored in localStorage
6. User redirected to Kanban board
7. Token included in all subsequent API calls

### Creating a Task
1. User clicks "New Task" button
2. TaskForm modal opens
3. Fills in task details (name, description, due date, assignee)
4. Selects target section
5. Submits form → API call → Redux update
6. New task appears in the board

### Moving a Task
1. User clicks and holds task card
2. Drags to different section
3. On drop, task updates via API
4. Redux state updates
5. Board re-renders with new task position

### Editing a Task
1. User clicks edit button on task card
2. UpdateTaskForm opens with current data
3. Modifies task properties
4. Submits → API call → Redux update
5. Changes reflect on the board

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- Backend API running on specified URL  
- npm or yarn  

### Installation Steps

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

4. Start development server:
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

### .env Configuration

- `REACT_APP_API_URL` – Backend API base URL (e.g., `http://localhost:5000/api`)

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm start

# Build optimized production bundle
npm run build

# Preview production build locally
npm test

# Run ESLint code quality checks
npm run eject

# Test the application
npm test
```

---

## 🎨 UI Library - Material-UI (MUI)

### Key MUI Features Used
- **Button** - Action buttons with variants
- **Card** - Task card containers
- **TextField** - Input fields for forms
- **Dialog/Modal** - Forms and confirmations
- **DatePicker** - Date selection from MUI X Date Pickers
- **Icons** - Action icons from @mui/icons-material
- **Grid** - Layout system for sections

### Installation
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-date-pickers dayjs
```

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from backend folder
2. **Start Frontend**: `npm start` from frontend folder
3. **Edit Components**: Modify React files in `src/components`
4. **Test Changes**: Open `http://localhost:3000` in browser
5. **Check Console**: View Redux actions and API calls
6. **API Testing**: Use browser DevTools Network tab

---

## 🧪 Testing Features

### Manual Testing Checklist

- [ ] User registration with valid credentials
- [ ] User login with email/password
- [ ] JWT token stored in localStorage
- [ ] Create new section
- [ ] Create new task with all properties
- [ ] Edit task details
- [ ] Delete task
- [ ] Drag task to different section
- [ ] Delete section
- [ ] Task shows correct assignee and due date
- [ ] API calls show in Network tab with token
- [ ] Loading states appear during API calls
- [ ] Error messages display on failures
- [ ] Logout clears token and redirects

---

## 🏗️ Component Hierarchy

```
App.js (DnD Provider)
└── Board.js
    ├── TaskForm.js (Create Task)
    ├── Section.js (multiple)
    │   ├── TaskCard.js (multiple)
    │   │   └── UpdateTaskForm.js (Edit Task)
    │   └── Actions (Edit/Delete Section)
    └── LoadingScreen.js
```

---

## 🔮 Future Enhancements

- Add **Task Comments** for collaboration
- Implement **Task Attachments** (files, links)
- Add **Task Labels & Tags** with filtering
- Implement **Team Member Permissions** (Admin, Manager, Member)
- Add **Activity Log** showing task changes
- Create **Task Notifications** for assignments
- Implement **Dark Mode** theme toggle
- Add **Task Search & Advanced Filtering**
- Implement **Keyboard Shortcuts** for power users
- Add **Undo/Redo** functionality
- Create **Analytics Dashboard** for project metrics

---

## 🐛 Troubleshooting

### API Connection Error
- Verify backend is running on correct URL
- Check `.env` REACT_APP_API_URL
- Check browser DevTools Network tab for 404/500 errors

### JWT Token Issues
- Clear localStorage: `localStorage.clear()`
- Re-login to get fresh token
- Verify token format in Network tab requests

### Drag & Drop Not Working
- Ensure DnD provider is in App.js
- Check React DnD packages installed
- Verify task card has drag handle setup

### Redux State Not Updating
- Check Redux DevTools browser extension
- Verify reducer logic in slices
- Check API response matches expected state shape

### Build Errors
- Clear node_modules: `rm -r node_modules && npm install`
- Clear build: `rm -r build`
- Check for TypeScript/JSX syntax errors

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the Collaborative WorkSpace Kanban application.**
