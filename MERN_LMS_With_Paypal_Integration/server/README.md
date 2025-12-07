# ⚙️ MERN LMS - Backend

This is the **backend API service** for the **MERN Learning Management System with PayPal Integration**.  
It provides a comprehensive RESTful API built with **Node.js, Express, and MongoDB**, handling user authentication, course management, student enrollments, order processing, and payment integration with PayPal.

---

## 🚀 Features

- **JWT Authentication**: Secure token-based user authentication.
- **Role-Based Access**: Separate functionality for Instructors and Students.
- **Course Management**: Full CRUD operations for course creation and management.
- **Lecture Organization**: Structure courses with video lectures and curriculum.
- **Student Enrollment**: Track student purchases and course access.
- **PayPal Integration**: Secure payment processing and order management.
- **Media Upload**: Cloudinary integration for video and image hosting.
- **Progress Tracking**: Monitor student progress within courses.
- **Order Management**: Complete order history and status tracking.
- **Password Security**: Bcryptjs for secure password hashing.
- **CORS Support**: Configured for frontend communication.
- **Error Handling**: Comprehensive error handling middleware.

---

## 🏗️ Folder Structure

```
server/
│
├── server.js # Main entry point - Express app start
├── package.json # Dependencies and scripts
│
├── routes/
│ ├── auth-routes/ # Authentication endpoints
│ │ └── index.js # Register, Login
│ │
│ ├── instructor-routes/
│ │ ├── course-routes.js # Create, read, update courses
│ │ └── media-routes.js # Upload lectures and media
│ │
│ └── student-routes/
│ ├── course-routes.js # Browse published courses
│ ├── order-routes.js # PayPal payment & order creation
│ ├── student-courses-routes.js # Get purchased courses
│ └── course-progress-routes.js # Track progress
│
├── controllers/
│ ├── auth-controller/ # Auth logic
│ │ └── index.js # Register, login handlers
│ │
│ ├── instructor-controller/
│ │ └── course-controller.js # Course CRUD operations
│ │
│ └── student-controller/
│ ├── course-controller.js # Browse courses
│ ├── order-controller.js # Payment & order handling
│ ├── student-courses-controller.js # Enrolled courses
│ └── course-progress-controller.js # Progress tracking
│
├── models/
│ ├── User.js # User schema (role: instructor/student)
│ ├── Course.js # Course with lectures curriculum
│ ├── Order.js # Payment orders from PayPal
│ ├── StudentCourses.js # Enrollment mapping
│ └── CourseProgress.js # Student progress per course
│
├── middleware/
│ └── auth-middleware.js # JWT verification
│
└── helpers/
 ├── paypal.js # PayPal SDK configuration
 └── cloudinary.js # Cloudinary configuration
```

---

## 📊 Database Models

### User Schema
```javascript
{
  userName: String,
  userEmail: String (unique),
  password: String (hashed),
  role: String (instructor | student)
}
```

### Course Schema
```javascript
{
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String (beginner | intermediate | advanced),
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String (Cloudinary URL),
  welcomeMessage: String,
  pricing: Number,
  objectives: String,
  students: [{ studentId, studentName, studentEmail, paidAmount }],
  curriculum: [{ title, videoUrl, public_id, freePreview }],
  isPublised: Boolean
}
```

### Order Schema
```javascript
{
  userId: String,
  userName: String,
  userEmail: String,
  orderStatus: String,
  paymentMethod: String (PayPal),
  paymentStatus: String (completed | pending | failed),
  orderDate: Date,
  paymentId: String (PayPal transaction ID),
  payerId: String (PayPal payer ID),
  instructorId: String,
  instructorName: String,
  courseImage: String,
  courseTitle: String,
  courseId: String,
  coursePricing: String
}
```

### StudentCourses Schema
```javascript
{
  userId: String,
  courses: [courseId],
  enrollmentDate: Date
}
```

### CourseProgress Schema
```javascript
{
  userId: String,
  courseId: String,
  completedLectures: [lectureId],
  progressPercentage: Number,
  lastAccessedDate: Date
}
```

---

## 🔑 Authentication & Authorization

### JWT Flow
1. User registers/logs in with credentials
2. Password hashed with bcryptjs
3. JWT token generated and sent to client
4. Client stores token in sessionStorage
5. Token included in Authorization header: `Bearer <token>`
6. Middleware verifies token on protected routes
7. User info extracted and attached to request

### Role-Based Access
- **Instructor**: Can create, edit courses and upload media
- **Student**: Can browse, purchase courses and track progress

---

## ⚡ API Endpoints

### Authentication Routes (`/auth`)

#### Register
```
POST /auth/register
Body: { userName, userEmail, password, role }
Response: { success, message, data: { user, accessToken } }
```

#### Login
```
POST /auth/login
Body: { userEmail, password }
Response: { success, message, data: { user, accessToken } }
```

### Instructor Routes

#### Create Course
```
POST /instructor/course/add
Headers: Authorization: Bearer <token>
Body: { title, category, level, primaryLanguage, subtitle, description, pricing, ... }
Response: Created course object
```

#### Get Instructor's Courses
```
GET /instructor/course/get
Headers: Authorization: Bearer <token>
Response: [{ _id, title, pricing, isPublised, students, ... }]
```

#### Get Course Details
```
GET /instructor/course/get/details/:id
Headers: Authorization: Bearer <token>
Response: Full course object with curriculum
```

#### Update Course
```
PUT /instructor/course/update/:id
Headers: Authorization: Bearer <token>
Body: Updated course fields
Response: Updated course object
```

#### Upload Lecture
```
POST /media/upload-lecture
Headers: Authorization: Bearer <token>
Body: FormData with video file
Response: { public_id, videoUrl }
```

### Student Routes

#### Get All Published Courses
```
GET /student/course/get
Response: [All published courses]
```

#### Get Course Details
```
GET /student/course/get/details/:id
Response: Course object with curriculum
```

#### Create Payment Order
```
POST /student/order/create
Headers: Authorization: Bearer <token>
Body: { courseId, instructorId, ... }
Response: { success, approvalURL (PayPal redirect URL) }
```

#### Capture Payment
```
POST /student/order/capture
Headers: Authorization: Bearer <token>
Body: { paymentId, payerId, courseId }
Response: { success, order object }
```

#### Get Purchased Courses
```
GET /student/courses-bought/get
Headers: Authorization: Bearer <token>
Response: [Student's purchased courses]
```

#### Add Course Progress
```
POST /student/course-progress/add
Headers: Authorization: Bearer <token>
Body: { courseId, lectureId }
Response: Updated progress
```

#### Get Course Progress
```
GET /student/course-progress/get/:courseId
Headers: Authorization: Bearer <token>
Response: Progress object
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 16  
- MongoDB (local or Atlas)  
- PayPal Developer Account  
- Cloudinary Account  

### Installation Steps

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
   JWT_SECRET=your_super_secret_key_change_this
   CLIENT_URL=http://localhost:5173
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET_ID=your_paypal_secret_id
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

---

## 📜 Available Scripts

```bash
# Start server with nodemon (auto-reload)
npm run dev

# Start server without auto-reload
npm start

# Test (if configured)
npm test
```

---

## 🧪 Testing the API

### Using curl:

```bash
# Register user
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "userName":"John Doe",
    "userEmail":"john@example.com",
    "password":"password123",
    "role":"instructor"
  }'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"john@example.com","password":"password123"}'

# Create Course
curl -X POST http://localhost:5000/instructor/course/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"React Masterclass",
    "category":"Web Development",
    "level":"intermediate",
    "pricing":99.99,
    ...
  }'

# Browse Courses
curl http://localhost:5000/student/course/get
```

### Using Postman:

1. Set base URL: `http://localhost:5000`
2. Create requests for each endpoint
3. Use token from login in Authorization header for protected routes
4. Test complete workflow: Register → Create Course → Get Courses → Create Order → Capture Payment

---

## 💳 PayPal Integration

### Configuration (`helpers/paypal.js`)
```javascript
paypal.configure({
  mode: "sandbox", // Change to "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_ID,
});
```

### Workflow
1. Frontend initiates course purchase
2. Backend creates PayPal payment object
3. Returns approval URL to frontend
4. User redirected to PayPal checkout
5. After approval, frontend captures payment
6. Backend finalizes order and adds student to course

---

## 🖼️ Media Upload with Cloudinary

### Configuration (`helpers/cloudinary.js`)
Configure Cloudinary API credentials for video/image uploads.

### Upload Process
1. Instructor uploads lecture video
2. Multer receives file
3. Cloudinary API processes upload
4. Returns video URL and public_id
5. Stored in course curriculum

---

## 🔒 Security Considerations

- **Password Hashing**: All passwords hashed with bcryptjs before storage
- **JWT Tokens**: Short-lived tokens for session security
- **CORS**: Restricted to frontend URL in production
- **Input Validation**: Validate all incoming requests
- **PayPal Sandbox**: Use for testing, switch to live for production
- **Environment Variables**: Never commit `.env` file
- **HTTPS**: Use in production for secure communication

---

## 🔧 Configuration

### Environment Variables
- `MONGO_URI` – MongoDB connection string
- `PORT` – Server port (default: 5000)
- `JWT_SECRET` – Secret key for token signing
- `CLIENT_URL` – Frontend URL for CORS
- `PAYPAL_CLIENT_ID` – PayPal client ID
- `PAYPAL_SECRET_ID` – PayPal secret
- `CLOUDINARY_NAME` – Cloudinary account name
- `CLOUDINARY_API_KEY` – Cloudinary API key
- `CLOUDINARY_API_SECRET` – Cloudinary secret

---

## 🔮 Future Enhancements

- Add **Request Validation** (joi/yup)
- Implement **Rate Limiting**
- Create **Comprehensive Logging** system
- Add **Automated Tests** (Jest/Mocha)
- Implement **Email Notifications**
- Create **Admin Dashboard** API
- Add **Refund Processing**
- Implement **Instructor Payouts**
- Create **API Documentation** (Swagger)
- Add **WebSocket** for real-time updates

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB running locally or Atlas accessible
- Verify MONGO_URI in .env

### PayPal Errors
- Check PayPal credentials in .env
- Verify sandbox mode for testing
- Ensure correct payment amount format

### JWT Token Errors
- Verify JWT_SECRET consistency
- Check token format: `Authorization: Bearer <token>`
- Token might be expired

### CORS Errors
- Verify CLIENT_URL matches frontend URL
- Check CORS configuration in server.js

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the MERN Learning Management System.**
