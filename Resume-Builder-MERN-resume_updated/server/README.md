# ⚙️ Resume Builder - Backend

This is the **backend API service** for the **Resume Builder MERN application**.  
Built with **Node.js, Express, and MongoDB**, it handles user authentication via Firebase, resume data management, and PDF generation for professional resume documents.

---

## 🚀 Features

- **Firebase Authentication**: Secure Google Sign-In integration.
- **User Management**: User registration, profile management, and data persistence.
- **Resume Data Storage**: Save and retrieve resume sections (profile, education, experience, projects, etc.).
- **JWT Authentication**: Token-based session management.
- **Resume CRUD Operations**: Create, read, update, and delete resume data.
- **User Feedback**: Collect user feedback and suggestions.
- **Data Validation**: Input validation for all resume fields.
- **CORS Support**: Configured for frontend communication.
- **Error Handling**: Comprehensive error handling middleware.
- **Logging**: Request logging middleware for debugging.

---

## 🏗️ Folder Structure

```
server/
│
├── index.js # Main entry point - Express app start
├── package.json # Dependencies and scripts
├── .env.example # Environment variables template
│
├── config/
│ └── db.js # MongoDB connection configuration
│
├── routes/
│ ├── auth.route.js # Google Sign-In endpoints
│ ├── user.route.js # User management endpoints
│ └── resume.route.js # Resume data endpoints
│
├── controllers/
│ ├── auth.controller.js # Authentication logic
│ ├── user.controller.js # User management logic
│ └── resume.controller.js # Resume CRUD operations
│
├── models/
│ ├── user.model.js # User schema
│ └── resume.model.js # Resume data schema
│
└── utils/
 ├── authHelper.js # Authentication utilities
 └── verifyUser.js # JWT verification middleware
```

---

## 📊 Database Models

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required, lowercase),
  password: String (required),
  avatar: String (default avatar URL),
  feedback: String (optional),
  timestamps: true
}
```

### Resume Schema
Comprehensive nested schema with multiple sections:

```javascript
{
  userId: String (references User),
  
  profile: {
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    aboutMe: String,
    address: String,
    linkedIn: String,
    github: String,
    codechef: String,
    leetcode: String,
    codeforces: String
  },
  
  education: {
    // College Education
    college: String,
    year: String,
    field: String,
    branch: String,
    startYear: String,
    endYear: String,
    city: String,
    grades: String,
    
    // Higher Secondary
    higherCollege: String,
    startYear2: String,
    endYear2: String,
    city2: String,
    percentage: String,
    board1: String,
    
    // School
    school: String,
    startYear3: String,
    endYear3: String,
    city3: String,
    percentage2: String,
    board2: String
  },
  
  projects: [{
    title: String,
    description: String,
    link: String,
    techStack: String
  }],
  
  experience: [{
    role: String,
    institute: String,
    start_date: String,
    end_date: String,
    desc: String
  }],
  
  extraDetails: {
    skills: [String],
    certifications: [String],
    languages: [String],
    ...
  }
}
```

---

## 🔑 Authentication & Authorization

### Firebase Integration
- **Google Sign-In**: Users authenticate via Google OAuth
- **Firebase ID Token**: Verified on backend
- **User Creation**: Automatic user account creation on first login

### JWT Flow
1. User signs in with Google
2. Firebase returns ID token
3. Backend verifies token with Firebase
4. Server generates JWT token for session
5. Token stored in client-side sessionStorage
6. Included in Authorization header for protected routes

---

## ⚡ API Endpoints

### Authentication Routes (`/api/auth`)

#### Google Sign-In
```
POST /api/auth/google-sign-in
Body: { 
  firebaseToken,
  googleId,
  email,
  name,
  profilePicture
}
Response: { 
  success: true,
  user: { id, email, username },
  token: JWT_TOKEN
}
```

### User Routes (`/api/user`)

#### Get User Profile
```
GET /api/user/profile
Headers: Authorization: Bearer <token>
Response: { success: true, user: { ...userData } }
```

#### Update User Profile
```
PUT /api/user/profile
Headers: Authorization: Bearer <token>
Body: { avatar, feedback, ... }
Response: { success: true, user: { ...updatedData } }
```

#### Submit Feedback
```
POST /api/user/feedback
Headers: Authorization: Bearer <token>
Body: { feedback: "User feedback text" }
Response: { success: true, message: "Feedback submitted" }
```

### Resume Data Routes (`/api/data`)

#### Save Resume Data
```
POST /api/data/resume-data
Headers: Authorization: Bearer <token>
Body: {
  profile: { ... },
  education: { ... },
  experience: [ ... ],
  projects: [ ... ],
  extraDetails: { ... }
}
Response: { success: true, resume: { ...savedData } }
```

#### Get All Resume Data
```
GET /api/data/get-all-resume-data
Headers: Authorization: Bearer <token>
Response: { 
  success: true, 
  resume: { profile, education, experience, projects, extraDetails }
}
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 16  
- MongoDB (local or Atlas)  
- Firebase Project (for authentication)  

### Installation Steps

1. Navigate to server folder:
   ```bash
   cd Resume-Builder-MERN-resume_updated/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   PORT=8080
   MONGO_URI=mongodb://localhost/resume_builder_db
   JWT_SECRET=your_super_secret_key_change_this
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   NODE_ENV=development
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:8080`

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
# Google Sign-In
curl -X POST http://localhost:8080/api/auth/google-sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "firebaseToken":"FIREBASE_ID_TOKEN",
    "email":"user@example.com",
    "name":"User Name"
  }'

# Get User Profile
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/user/profile

# Save Resume Data
curl -X POST http://localhost:8080/api/data/resume-data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "firstName":"John",
      "lastName":"Doe",
      "email":"john@example.com"
    },
    "education": { ... },
    ...
  }'

# Get Resume Data
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/data/get-all-resume-data
```

### Using Postman:

1. Set base URL: `http://localhost:8080/api`
2. Use Google Sign-In to get JWT token
3. Add token in Authorization header: `Bearer <token>`
4. Test each endpoint with appropriate method and body

---

## 🔐 Security Considerations

- **Firebase Authentication**: Secure Google OAuth implementation
- **JWT Tokens**: Session-based authentication with expiration
- **Password Hashing**: Bcrypt for password security if using password auth
- **Input Validation**: Validate all resume fields
- **CORS**: Restricted to frontend URL in production
- **Environment Variables**: Never commit `.env` file
- **HTTPS**: Use in production for secure communication
- **MongoDB Encryption**: Enable encryption at rest

---

## 🔧 Configuration

### Environment Variables
- `PORT` – Server port (default: 8080)
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – Secret key for token signing
- `FIREBASE_PROJECT_ID` – Firebase project ID
- `FIREBASE_PRIVATE_KEY` – Firebase private key
- `FIREBASE_CLIENT_EMAIL` – Firebase client email
- `NODE_ENV` – Environment (development/production)

### Middleware Stack
1. Express JSON parser
2. CORS for cross-origin requests
3. Logging middleware
4. Route handlers
5. Error handling middleware

---

## 📡 Firebase Setup

### Configuration Steps
1. Create Firebase project at console.firebase.google.com
2. Enable Google Sign-In in Authentication
3. Get Service Account credentials
4. Add credentials to .env file
5. Configure Firestore/Realtime Database (if needed)

### Security Rules
```
// Allow authenticated users to read/write their own data
match /users/{uid} {
  allow read, write: if request.auth.uid == uid;
}
```

---

## 🔮 Future Enhancements

- Add **Resume Template Generation** on backend
- Implement **PDF Generation** (Puppeteer)
- Add **Email Notifications**
- Create **Resume Analytics** API
- Implement **Social Sharing** API
- Add **ATS Optimization** API
- Create **Interview Prep** recommendations API
- Implement **Resume Versioning** API
- Add **Export to Multiple Formats** API
- Create **Resume Sharing via Link** functionality

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB running locally or Atlas accessible
- Verify MONGO_URI in .env
- Check network connectivity

### Firebase Authentication Error
- Verify Firebase credentials in .env
- Check Firebase project configuration
- Ensure Google Sign-In enabled in Firebase Console

### JWT Token Invalid
- Verify JWT_SECRET consistency
- Check token expiration
- Ensure token format: `Authorization: Bearer <token>`

### CORS Errors
- Verify CLIENT_URL matches frontend URL
- Check CORS configuration in server.js
- Ensure credentials flag set correctly

### Resume Data Not Saving
- Verify user is authenticated (token valid)
- Check resume data structure matches schema
- Verify MongoDB connection
- Check for validation errors in logs

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the Resume Builder MERN application.**
