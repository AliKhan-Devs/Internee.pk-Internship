# 🎨 MERN LMS - Frontend

This is the **frontend application** for the **MERN Learning Management System with PayPal Integration**.  
Built with **React 18**, **Vite**, **Tailwind CSS**, and **Radix UI**, it provides a modern, responsive interface for both instructors and students to manage courses, process payments, and track learning progress.

---

## 🚀 Features

- **Role-Based Dashboards**: Separate UIs for Instructors and Students.
- **Course Creation**: Intuitive form for instructors to create and publish courses.
- **Video Streaming**: React Player for seamless video playback.
- **Drag & Drop Upload**: Easy media upload with Cloudinary integration.
- **PayPal Payment**: Secure payment processing with PayPal integration.
- **Progress Tracking**: Visual progress indicators for course completion.
- **Responsive Design**: Mobile-first design with Tailwind CSS.
- **Context API State Management**: Centralized state for auth, instructor, and student data.
- **Reusable UI Components**: Radix UI-based component library.
- **Route Guards**: Protected routes based on user role and authentication.
- **Form Validation**: Custom form handling with validation.
- **Toast Notifications**: User-friendly notification system.
- **Animations**: Smooth animations with Framer Motion.

---

## 🏗️ Folder Structure

```
client/
│
├── package.json # Dependencies and scripts
├── vite.config.js # Vite bundler configuration
├── tailwind.config.js # Tailwind CSS setup
├── index.html # Main HTML file
│
└── src/
 ├── App.jsx # Main router with protected routes
 ├── main.jsx # React entry point
 ├── index.css # Global styles
 │
 ├── pages/ # Page components
 │ ├── auth/ # Login/Register page
 │ ├── instructor/
 │ │ ├── index.jsx # Instructor dashboard
 │ │ └── add-new-course.jsx # Course creation form
 │ ├── student/
 │ │ ├── home/ # Landing page
 │ │ ├── courses/ # Course listing
 │ │ ├── course-details/ # Course detail page
 │ │ ├── student-courses/ # Purchased courses
 │ │ ├── course-progress/ # Learning progress page
 │ │ └── payment-return/ # PayPal return page
 │ └── not-found/ # 404 page
 │
 ├── components/
 │ ├── common-form/
 │ │ ├── index.jsx # Form wrapper
 │ │ └── form-controls.jsx # Input fields
 │ │
 │ ├── instructor-view/
 │ │ ├── dashboard/ # Instructor dashboard
 │ │ └── courses/ # Course management
 │ │
 │ ├── student-view/
 │ │ ├── header.jsx # Navigation header
 │ │ └── common-layout.jsx # Layout wrapper
 │ │
 │ ├── route-guard/ # Protected route wrapper
 │ ├── video-player/ # Video player component
 │ ├── media-progress-bar/ # Progress display
 │ │
 │ └── ui/ # Reusable Radix UI components
 │ ├── button.jsx
 │ ├── card.jsx
 │ ├── input.jsx
 │ ├── label.jsx
 │ ├── dialog.jsx
 │ ├── form-controls.jsx
 │ ├── select.jsx
 │ ├── textarea.jsx
 │ ├── checkbox.jsx
 │ ├── switch.jsx
 │ ├── tabs.jsx
 │ ├── dropdown-menu.jsx
 │ ├── scroll-area.jsx
 │ ├── slider.jsx
 │ ├── skeleton.jsx
 │ ├── table.jsx
 │ ├── toast.jsx
 │ └── toaster.jsx
 │
 ├── context/ # React Context for state
 │ ├── auth-context/ # Authentication state
 │ ├── instructor-context/ # Instructor courses state
 │ └── student-context/ # Student courses & progress state
 │
 ├── api/
 │ └── axiosInstance.js # Axios with JWT interceptor
 │
 ├── services/ # API service functions
 ├── config/ # Configuration constants
 ├── hooks/ # Custom hooks (use-toast)
 ├── lib/ # Utility functions
 └── assets/ # Images, icons, static files
```

---

## 🔑 Key Components

### App.jsx
- Root component with React Router setup
- Route definitions for all pages
- Route guards for protected routes
- Role-based route access (Instructor vs Student)

```jsx
<Routes>
  <Route path="/auth" element={<RouteGuard element={<AuthPage />} ... />} />
  <Route path="/instructor" element={<RouteGuard element={<InstructorDashboard />} ... />} />
  <Route path="/student/courses" element={<StudentCoursesPage />} />
  ...
</Routes>
```

### Authentication Context
- Manages user login state
- Handles token storage in sessionStorage
- Provides user info across app
- Manages sign in/up form data

```jsx
const { auth, handleLoginUser, handleRegisterUser } = useContext(AuthContext);
```

### Instructor Context
- Manages course creation and editing
- Handles course data state
- Manages course listing

### Student Context
- Manages purchased courses
- Tracks course progress
- Handles enrollment state

### Route Guard Component
- Protects routes based on authentication
- Validates user role (instructor/student)
- Redirects unauthorized users
- Shows loading skeleton while checking auth

---

## 📦 State Management

### Auth Context
```javascript
{
  auth: {
    authenticate: boolean,
    user: { userName, userEmail, role }
  },
  signInFormData: { email, password },
  signUpFormData: { name, email, password },
  handleLoginUser: (email, password) => {},
  handleRegisterUser: (name, email, password, role) => {}
}
```

### Instructor Context
```javascript
{
  courses: [],
  courseDetails: {},
  handleCreateCourse: (courseData) => {},
  handleUpdateCourse: (courseId, courseData) => {},
  handleGetAllCourses: () => {},
  handleGetCourseDetailsById: (courseId) => {}
}
```

### Student Context
```javascript
{
  studentCourses: [],
  courseProgress: {},
  handleGetAllStudentCourses: () => {},
  handleGetCourseProgress: (courseId) => {}
}
```

---

## 🌐 API Integration

### Axios Instance (`api/axiosInstance.js`)
```javascript
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// JWT Token Interceptor
axiosInstance.interceptors.request.use((config) => {
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
```

Automatically adds JWT token to all requests from sessionStorage.

---

## 🎯 User Workflows

### Instructor Workflow
1. Register/Login as Instructor
2. Navigate to Instructor Dashboard
3. Click "Add New Course"
4. Fill course details (title, description, pricing, etc.)
5. Upload course image and lecture videos
6. Set up curriculum with lectures
7. Publish course (isPublished = true)
8. Course appears on student marketplace

### Student Workflow
1. Register/Login as Student
2. Browse available courses on home page
3. View course details and preview videos
4. Click "Enroll Now" to purchase
5. Redirected to PayPal payment gateway
6. Complete payment in PayPal
7. Returned to payment-return page
8. Access course from "My Courses" section
9. Watch lectures and track progress

### Payment Flow
1. Student clicks "Enroll" on course
2. Frontend calls `/student/order/create`
3. Backend creates PayPal payment and returns approval URL
4. Student redirected to PayPal checkout
5. Student approves payment on PayPal
6. PayPal redirects back to `/payment-return`
7. Frontend calls `/student/order/capture` with payment details
8. Backend processes order and enrolls student
9. Course unlocked for student

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- Backend API running on `http://localhost:5000`

### Installation Steps

1. Navigate to client folder:
   ```bash
   cd MERN_LMS_With_Paypal_Integration/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Configuration

Update API base URL in `src/api/axiosInstance.js` if backend runs on different URL:
```javascript
const axiosInstance = axios.create({
  baseURL: "http://your-backend-url:5000",
});
```

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint code quality checks
npm run lint
```

---

## 🎨 UI Library - Radix UI

### Features Used
- **Dialog** - Modal forms for course creation
- **Select** - Dropdown for category/level selection
- **Checkbox** - Terms and conditions acceptance
- **Tabs** - Course sections navigation
- **Slider** - Progress visualization
- **Toast** - User notifications
- **Scroll Area** - Scrollable course list
- **Dropdown Menu** - User account menu

### Tailwind CSS
- Utility-first CSS framework
- Dark mode support
- Responsive grid and flex utilities
- Custom animations and transitions

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from server folder
2. **Start Frontend**: `npm run dev` from client folder
3. **Edit Components**: Modify React files in `src/components` or `src/pages`
4. **Test Changes**: Open `http://localhost:5173` in browser
5. **Check Console**: View console logs and API calls
6. **Use DevTools**: Inspect component state and props

---

## 🎬 Video Player Component

Displays course lectures using React Player with:
- Play/pause controls
- Progress bar
- Volume control
- Fullscreen mode
- Quality selection

```jsx
<ReactPlayer 
  url={videoUrl} 
  controls 
  width="100%" 
  height="100%"
/>
```

---

## 📊 Course Progress Tracking

Visual indicators show:
- Lectures completed vs total
- Percentage completion
- Last accessed date
- Current lecture position

---

## 🔮 Future Enhancements

- Add **Course Reviews & Ratings**
- Implement **Discussion Forum** per course
- Add **Certificates** upon completion
- Create **Course Wishlist** feature
- Implement **Search & Advanced Filters**
- Add **Instructor Analytics** dashboard
- Create **Discussion Comments** on lectures
- Add **Downloadable Resources**
- Implement **Course Bundles**
- Add **Referral Program**
- Create **Student Analytics** dashboard
- Add **Live Chat** support

---

## 🧪 Testing Checklist

- [ ] User registration (Instructor & Student)
- [ ] User login with correct credentials
- [ ] JWT token stored in sessionStorage
- [ ] Instructor can create new course
- [ ] Upload course image and videos
- [ ] Course appears in student marketplace
- [ ] Student can browse courses
- [ ] View course details page
- [ ] Initiate PayPal payment flow
- [ ] Complete payment in PayPal sandbox
- [ ] Return from payment and enroll student
- [ ] Access purchased course from My Courses
- [ ] Watch course videos
- [ ] Track learning progress
- [ ] Logout clears token and redirects

---

## 🐛 Troubleshooting

### API Connection Error
- Verify backend running on correct URL
- Check browser DevTools Network tab
- Verify base URL in axiosInstance.js

### JWT Token Not Working
- Clear sessionStorage: `sessionStorage.clear()`
- Re-login to get fresh token
- Check token format in requests

### PayPal Payment Issues
- Verify PayPal sandbox credentials
- Check payment amount format
- Ensure return URL is correct
- Check PayPal callback handling

### Video Not Playing
- Verify video URL is accessible
- Check Cloudinary account setup
- Verify video format is supported

### Form Validation Issues
- Check required fields are filled
- Verify input formats (email, etc.)
- Check browser console for errors

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the MERN Learning Management System with PayPal Integration.**
