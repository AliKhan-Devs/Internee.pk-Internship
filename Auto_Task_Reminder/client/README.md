# 🎨 Auto Task Reminder - Frontend

This is the **frontend application** for the **Auto Task Reminder**.  
It is built with **React (Vite)** and styled using **Tailwind CSS**, providing a modern and responsive UI for managing tasks with date-based reminders.

---

## 🚀 Features

- **Task Management Interface**: Create, view, update, and delete tasks with an intuitive UI.
- **Responsive Design**: Fully responsive layout built with Tailwind CSS grid system.
- **Form Validation**: React Hook Form for efficient form handling and validation.
- **Real-time Updates**: Instant UI updates when tasks are modified.
- **Routing**: Multi-page navigation with React Router (Home & Task Form pages).
- **Axios Integration**: Centralized API service for seamless backend communication.
- **Fast Development**: Vite for lightning-fast development and optimized production builds.
- **ESLint Support**: Code quality checks for maintaining clean code standards.

---

## 🏗️ Folder Structure

```
client/
│
├── package.json # Dependencies and scripts
├── vite.config.js # Vite bundler configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS setup for Tailwind
├── eslintrc.cjs # ESLint configuration
├── index.html # Main HTML entry point
│
├── public/ # Static assets (images, icons, etc.)
│
└── src/
 ├── main.jsx # React entry point
 ├── App.jsx # Main app component with routing
 ├── index.css # Global styles (Tailwind imports)
 │
 ├── pages/ # Page components
 │ ├── HomePage.jsx # Displays grid of all tasks
 │ └── TaskFormPage.jsx # Form to create/edit tasks
 │
 ├── components/ # Reusable UI components
 │ └── TaskCard.jsx # Individual task card display
 │
 └── api/
  └── task.api.js # API service functions (axios calls)
```

---

## 🔑 Key Components & Pages

### Pages

#### HomePage.jsx
- Fetches all tasks from backend
- Displays tasks in a responsive 3-column grid using Tailwind
- Shows TaskCard components for each task
- Auto-loads tasks on component mount

```jsx
function HomePage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function loadTasks() {
      const res = await getTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);
  // Grid display logic...
}
```

#### TaskFormPage.jsx
- Form to create new tasks or edit existing ones
- Uses React Hook Form for efficient form management
- Submit handler sends data to backend
- Redirect to home after successful submission

### Components

#### TaskCard.jsx
- Displays individual task details
- Shows title, description, tags, and due date
- Action buttons for edit and delete operations
- Styled with Tailwind for consistent design

---

## ⚡ API Service Layer

The `api/task.api.js` provides a centralized Axios instance for all backend communication:

```javascript
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const getTasks = async () => await API.get("/tasks");
export const createTask = async (task) => await API.post("/tasks", task);
export const getTask = async (id) => await API.get(`/tasks/${id}`);
export const updateTask = async (id, task) => await API.put(`/tasks/${id}`, task);
export const deleteTask = async (id) => await API.delete(`/tasks/${id}`);
```

**Note**: Update the `baseURL` if backend runs on a different port or domain.

---

## 🛣️ Routing

The application uses React Router for navigation:

- `/` – **Home Page** (displays all tasks)
- `/create` – **Create Task Form** (new task creation)
- `/edit/:id` – **Edit Task Form** (edit existing task by ID)

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/create" element={<TaskFormPage />} />
  <Route path="/edit/:id" element={<TaskFormPage />} />
</Routes>
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- Backend API running on `http://localhost:4000`

### Installation

1. Navigate to the client folder:
   ```bash
   cd Auto_Task_Reminder/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Update backend API URL in `src/api/task.api.js` if backend runs on different URL:
   ```javascript
   const API = axios.create({ baseURL: "http://your-backend-url:4000/api" });
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (Vite's default)

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (creates optimized dist folder)
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

---

## 🎨 Styling & Design

### Tailwind CSS
- Configured in `tailwind.config.js`
- Global styles imported in `src/index.css`
- Responsive classes for mobile-first design
- Dark theme support (example: `bg-neutral-950` used for dark background)

### Layout
- **Grid Layout**: 3-column grid for task cards (`grid-cols-3 gap-2`)
- **Full Height Screen**: Dark background with `h-screen` and `bg-neutral-950`
- **Container**: Centered container with `container mx-auto`

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from root directory
2. **Start Frontend**: `npm run dev` from client directory
3. **Edit Components**: Modify React files in `src/`
4. **Hot Reload**: Changes automatically appear in browser (Vite feature)
5. **API Testing**: Open browser DevTools to see API calls in Network tab
6. **Build**: `npm run build` to create production build

---

## 🧪 Testing the Frontend

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Verify you can:
   - See existing tasks on home page
   - Create new tasks via `/create` route
   - Edit tasks via `/edit/:id` route
   - Delete tasks (if delete button is implemented in TaskCard)
   - See real-time updates after submissions

---

## 🔧 Configuration Files

### vite.config.js
- Vite bundler configuration
- React plugin for JSX support
- Port configuration

### tailwind.config.js
- Tailwind CSS customization
- Custom colors, fonts, breakpoints
- Plugin configurations

### postcss.config.js
- PostCSS plugins for Tailwind processing
- Autoprefixer for browser compatibility

### .eslintrc.cjs
- ESLint rules for code quality
- React and React Hooks configurations

---

## 🚀 Production Build

To build for production:

```bash
npm run build
```

This creates:
- Optimized and minified code in `dist/` folder
- Ready for deployment to Vercel, Netlify, or other static hosts

To preview production build locally:

```bash
npm run preview
```

---

## 🔮 Future Enhancements

- Implement **Task Edit Functionality** (fully in TaskCard)
- Add **Delete Confirmation Modal**
- Add **Search & Filter** for tasks
- Implement **Task Sorting** (by date, priority, etc.)
- Add **Pagination** for large task lists
- Add **Dark Mode Toggle** (Tailwind already supports dark:)
- Implement **Task Priority Levels** with color coding
- Add **Tag-based Filtering**
- Add **Loading States & Spinners** during API calls
- Implement **Error Handling & Toast Notifications**
- Add **User Authentication** integration

---

## 🐛 Troubleshooting

### Backend Connection Error
- Verify backend is running on `http://localhost:4000`
- Check CORS is enabled on backend
- Update `baseURL` in `src/api/task.api.js` if needed

### Hot Reload Not Working
- Restart Vite dev server: `npm run dev`
- Clear node_modules and reinstall: `rm -r node_modules && npm install`

### Port Already in Use
- Vite will automatically try the next available port
- Or specify port: `npm run dev -- --port 3000`

### Build Failures
- Clear dist folder: `rm -r dist`
- Reinstall dependencies: `npm install`
- Run linter to fix issues: `npm run lint`

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the Auto Task Reminder MERN Stack project.**
