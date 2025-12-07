# 🎓 MERN LMS with PayPal Integration

A comprehensive **full-stack Learning Management System (LMS)** built with the **MERN Stack** that enables instructors to create and sell courses while students can purchase, learn, and track progress. Integrated with **PayPal** for seamless payment processing.

---

## 🚀 Features

### 👨‍🏫 Instructor Features
- **Course Creation & Management**: Create courses with title, description, pricing, and learning objectives.
- **Lecture Management**: Upload video lectures with support for free preview videos.
- **Course Curriculum**: Organize lectures into structured curriculum.
- **Course Analytics**: Track student enrollments and course performance.
- **Media Upload**: Upload course images and videos to Cloudinary.
- **Course Publishing**: Control course visibility and publication status.

### 👨‍🎓 Student Features
- **Course Browsing**: Search and filter courses by category, level, and language.
- **Course Purchase**: Secure payment via PayPal integration.
- **Video Streaming**: Play course videos with progress tracking.
- **Course Progress**: Track learning progress across lessons.
- **My Courses**: Access all purchased courses in one place.
- **Course Details**: View detailed course information before purchase.

### 💳 Payment Integration
- **PayPal Payment Gateway**: Secure payment processing with PayPal.
- **Order Management**: Complete order tracking and history.
- **Payment Status Tracking**: Monitor payment and order status.
- **Secure Transactions**: Encrypted payment data and secure tokens.

### 🔐 Authentication & Security
- **User Authentication**: JWT-based login/registration system.
- **Role-Based Access**: Separate dashboards for Instructors and Students.
- **Password Hashing**: Bcrypt for secure password storage.
- **Session Management**: Token-based authentication via sessionStorage.

---

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS  
- **UI Components**: Radix UI for accessible, customizable components  
- **Routing**: React Router v6  
- **State Management**: React Context API  
- **HTTP Client**: Axios with JWT interceptors  
- **Animations**: Framer Motion + React Confetti  
- **Video Player**: React Player  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: JWT (JSON Web Tokens)  
- **Media Storage**: Cloudinary  
- **Payment Gateway**: PayPal REST SDK  
- **Password Security**: Bcryptjs  

---

## 📂 Project Structure

```
MERN_LMS_With_Paypal_Integration/
│
├── client/ # React Frontend Application
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite configuration
│ ├── tailwind.config.js # Tailwind CSS setup
│ ├── index.html # Main HTML file
│ │
│ └── src/
│ ├── App.jsx # Main router component
│ ├── main.jsx # Entry point
│ ├── index.css # Global styles
│ │
│ ├── pages/ # Page components
│ │ ├── auth/ # Login/Register page
│ │ ├── instructor/ # Instructor dashboard & course creation
│ │ ├── student/ # Student pages (home, courses, details, progress, payment)
│ │ └── not-found/ # 404 page
│ │
│ ├── components/
│ │ ├── common-form/ # Form components for auth
│ │ ├── instructor-view/ # Instructor-specific components
│ │ ├── student-view/ # Student-specific components
│ │ ├── route-guard/ # Protected route wrapper
│ │ ├── video-player/ # Video player component
│ │ ├── media-progress-bar/ # Progress bar display
│ │ └── ui/ # Reusable UI components (button, card, input, etc.)
│ │
│ ├── context/ # React Context for state management
│ │ ├── auth-context/ # Authentication state
│ │ ├── instructor-context/ # Instructor state
│ │ └── student-context/ # Student state
│ │
│ ├── api/
│ │ └── axiosInstance.js # Axios setup with JWT interceptor
│ │
│ ├── services/ # API service functions
│ ├── config/ # Configuration constants
│ ├── hooks/ # Custom React hooks (use-toast)
│ └── lib/ # Utility functions
│
└── server/ # Node.js + Express Backend
 ├── server.js # Entry point
 ├── package.json # Backend dependencies
 │
 ├── routes/
 │ ├── auth-routes/ # Authentication endpoints
 │ ├── instructor-routes/ # Instructor course & media routes
 │ └── student-routes/ # Student purchase & course routes
 │
 ├── controllers/
 │ ├── auth-controller/ # Auth logic (register, login)
 │ ├── instructor-controller/ # Instructor course management
 │ └── student-controller/ # Student purchase & progress
 │
 ├── models/
 │ ├── User.js # User schema (Instructor/Student)
 │ ├── Course.js # Course schema with lectures
 │ ├── Order.js # Order schema for purchases
 │ ├── StudentCourses.js # Purchased courses mapping
 │ └── CourseProgress.js # Student progress tracking
 │
 ├── middleware/
 │ └── auth-middleware.js # JWT verification
 │
 └── helpers/
  ├── paypal.js # PayPal SDK configuration
  └── cloudinary.js # Cloudinary configuration
```

---

## ⚡ API Overview

### Authentication Routes (`/auth`)
- `POST /auth/register` – Register new user (Instructor or Student)
- `POST /auth/login` – Login and receive JWT token
- `POST /auth/logout` – Logout user

### Instructor Routes

#### Course Management (`/instructor/course`)
- `POST /instructor/course/add` – Create new course
- `GET /instructor/course/get` – Get all instructor's courses
- `GET /instructor/course/get/details/:id` – Get course details
- `PUT /instructor/course/update/:id` – Update course

#### Media Upload (`/media`)
- `POST /media/upload-lecture` – Upload lecture video
- `POST /media/bulk-upload` – Bulk upload media
- `DELETE /media/delete/:id` – Delete media

### Student Routes

#### Browse Courses (`/student/course`)
- `GET /student/course/get` – Get all published courses
- `GET /student/course/get/details/:id` – Get course details

#### Purchase & Orders (`/student/order`)
- `POST /student/order/create` – Create PayPal payment order
- `POST /student/order/capture` – Capture payment and finalize order

#### Purchased Courses (`/student/courses-bought`)
- `GET /student/courses-bought/get` – Get student's purchased courses

#### Progress Tracking (`/student/course-progress`)
- `POST /student/course-progress/add` – Add course progress
- `GET /student/course-progress/get/:courseId` – Get course progress

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- MongoDB (local or Atlas)  
- PayPal Developer Account  
- Cloudinary Account  

### Backend Setup

1. Navigate to server folder:
   ```bash
   cd MERN_LMS_With_Paypal_Integration/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost/lms_db
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET_ID=your_paypal_secret_id
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start backend server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to client folder:
   ```bash
   cd MERN_LMS_With_Paypal_Integration/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API base URL in `src/api/axiosInstance.js` if needed

4. Start frontend development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from server folder
2. **Start Frontend**: `npm run dev` from client folder
3. **Make Changes**: Edit components, controllers, or models
4. **Hot Reload**: Changes reflect automatically
5. **Test Payment**: Use PayPal sandbox mode for testing

---

## 💳 PayPal Integration Setup

1. **Create PayPal Developer Account**: https://developer.paypal.com
2. **Get Sandbox Credentials**: Client ID and Secret
3. **Add to .env**: Configure PayPal credentials
4. **Test Payments**: Use PayPal sandbox test accounts

---

## 🔮 Future Enhancements

- Add **Course Reviews & Ratings** system
- Implement **Discussion Forum** for courses
- Add **Certificates** upon course completion
- Implement **Instructor Payouts** system
- Add **Course Categories & Filters**
- Implement **Search Functionality**
- Add **Wishlist** feature for students
- Create **Admin Dashboard** for site management
- Implement **Email Notifications**
- Add **Coupon & Discount Codes**
- Create **Course Analytics** dashboard
- Implement **Live Classes** via WebRTC

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙋 Support

For issues or questions, feel free to reach out or create an issue in the repository.

---

**Built as a complete Learning Management System solution for course selling and learning.**
