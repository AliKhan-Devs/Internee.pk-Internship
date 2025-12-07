# PortaBuild Backend API

Backend server for PortaBuild - A no-code portfolio builder platform. Built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Performance](#performance)

## 🎯 Overview

The PortaBuild backend provides a RESTful API for managing portfolios, users, themes, sections, and analytics. It handles authentication, file uploads, and portfolio data management with MongoDB as the database.

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime environment
- **Express 5** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud-based image and video management
- **Multer** - Middleware for handling multipart/form-data (file uploads)
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Parse HTTP request cookies
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
backend/
├── app.js                      # Express app configuration
├── server.js                   # Server entry point with clustering
├── package.json                # Dependencies and scripts
│
├── configurations/             # Configuration files
│   ├── db.js                   # MongoDB connection
│   └── cloudinray.js           # Cloudinary configuration
│
├── controllers/                # Request handlers
│   ├── authControllers.js      # Authentication logic
│   ├── portfolioControllers.js # Portfolio management
│   ├── themeControllers.js     # Theme management
│   ├── contactControllers.js   # Contact form handling
│   ├── analyticsControllers.js # Analytics tracking
│   ├── usersControllers.js     # User management
│   ├── cloudinaryControllers.js # Image upload handling
│   └── components_controllers/ # Component-specific controllers
│       ├── buttonControllers.js
│       ├── cardControllers.js
│       ├── overviewControllers.js
│       └── profilecControllers.js
│
├── middlewares/                # Custom middleware
│   └── authMiddleware.js      # JWT authentication middleware
│
├── models/                     # Mongoose schemas
│   ├── User.js                # User model
│   ├── Portfolio.js           # Portfolio model
│   ├── Theme.js               # Theme model
│   ├── Profile.js             # Profile model
│   ├── Overview.js            # Overview model
│   ├── Card.js                # Card model
│   ├── Button.js              # Button model
│   ├── Contact.js             # Contact model
│   └── Analytics.js           # Analytics model
│
├── routes/                     # API route definitions
│   ├── authRoutes.js          # Authentication routes
│   ├── portfolioRoutes.js     # Portfolio routes
│   ├── themeRoutes.js         # Theme routes
│   ├── sectionRoutes.js       # Section routes
│   ├── contactRoutes.js       # Contact routes
│   ├── analyticsRoutes.js     # Analytics routes
│   ├── imageUpload.js         # Image upload routes
│   ├── userRoutes.js          # User routes
│   ├── buttonsRoutes.js       # Button routes
│   └── cardsRoutes.js         # Card routes
│
├── utils/                      # Utility functions
│   ├── auth.js                # Authentication utilities
│   ├── upload.js              # File upload utilities
│   └── generatePortfolioInitialy.js # Portfolio initialization
│
└── uploads/                    # Temporary file storage (local)
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- **Cloudinary** account (for image uploads)

## 🚀 Installation

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the backend root directory (see Configuration section)

4. **Start the server**
   ```bash
   node server.js
   ```
   Or for development with auto-reload:
   ```bash
   nodemon server.js
   ```

## ⚙️ Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_DB_URI=mongodb://localhost:27017/portabuild
# Or for MongoDB Atlas:
# MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/portabuild

# JWT Configuration
SECRET=your-secret-key-here
EXPIRES_IN=7d
SALT_ROUND=10

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS Configuration (optional)
ALLOWED_ORIGINS=http://localhost:5173,https://portabuild.vercel.app
```

### Environment Variables Explained

- **PORT**: Server port number (default: 5000)
- **MONGO_DB_URI**: MongoDB connection string
- **SECRET**: Secret key for JWT token signing
- **EXPIRES_IN**: JWT token expiration time (e.g., "7d", "24h")
- **SALT_ROUND**: Number of rounds for bcrypt password hashing
- **CLOUDINARY_***: Cloudinary credentials for image uploads

## 🏃 Running the Server

### Development Mode

```bash
nodemon server.js
```

### Production Mode

```bash
node server.js
```

The server uses **Node.js clustering** to utilize all available CPU cores for better performance. The master process forks worker processes, and if a worker crashes, it automatically restarts.

### Server Output

When running, you should see:
```
Master <pid> is running
Starting <num> worker processes...

Worker <pid> running on port 5000
DB Connected Successfully
```

## 🔌 API Endpoints

### Authentication Routes (`/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/register` | Register a new user | No |
| POST | `/user/login` | Login user | No |
| POST | `/user/logout` | Logout user | Yes |
| GET | `/user/me` | Get current user info | Yes |

### Portfolio Routes (`/portfolio`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/portfolio` | Get user's portfolio | Yes |
| POST | `/portfolio` | Create new portfolio | Yes |
| PUT | `/portfolio/:id` | Update portfolio | Yes |
| DELETE | `/portfolio/:id` | Delete portfolio | Yes |

### Theme Routes (`/theme`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/theme` | Get all themes | No |
| GET | `/theme/:id` | Get theme by ID | No |
| POST | `/theme` | Create theme | Yes |
| PUT | `/theme/:id` | Update theme | Yes |
| DELETE | `/theme/:id` | Delete theme | Yes |

### Section Routes (`/section`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/section` | Get all sections | Yes |
| POST | `/section` | Create section | Yes |
| PUT | `/section/:id` | Update section | Yes |
| DELETE | `/section/:id` | Delete section | Yes |

### Contact Routes (`/contact`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/contact` | Submit contact form | No |
| GET | `/contact` | Get contact messages | Yes |
| DELETE | `/contact/:id` | Delete contact message | Yes |

### Analytics Routes (`/analytics`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/analytics` | Get portfolio analytics | Yes |
| POST | `/analytics` | Track portfolio view | No |

### Image Upload Routes (`/upload`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload` | Upload image to Cloudinary | Yes |

### User Routes (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/:username` | Get user by username | No |
| GET | `/users` | Get all users | Yes |

### Component Routes

- **Buttons** (`/button`) - Manage button components
- **Cards** (`/card`) - Manage card components

## 🗄️ Database Models

### User Model
- `name` (String, required)
- `userName` (String, required, unique)
- `email` (String, required, unique)
- `phone` (String, required)
- `password` (String, required, hashed)
- `timestamps` (createdAt, updatedAt)

### Portfolio Model
- `userId` (ObjectId, ref: User)
- `profileIds` (Array of ObjectId, ref: Profile)
- `overviewIds` (Array of ObjectId, ref: Overview)
- `themeId` (ObjectId, ref: Theme)
- `contactId` (ObjectId, ref: Contact)

### Other Models
- **Theme** - Portfolio theme configurations
- **Profile** - User profile information
- **Overview** - Portfolio overview sections
- **Card** - Card components
- **Button** - Button components
- **Contact** - Contact form submissions
- **Analytics** - Portfolio view analytics

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. **Registration/Login**: User credentials are validated, and a JWT token is generated
2. **Token Storage**: Tokens are stored in **HttpOnly cookies** for security
3. **Protected Routes**: Use the `protect` middleware to verify tokens
4. **Password Security**: Passwords are hashed using bcrypt before storage

### Authentication Middleware

```javascript
import { protect } from '../middlewares/authMiddleware.js';

router.get('/protected-route', protect, controllerFunction);
```

The `protect` middleware:
- Extracts token from HttpOnly cookie
- Verifies token signature
- Attaches user information to `req.user`
- Returns 401 if token is missing or invalid

## 📤 File Upload

The backend supports image uploads through **Cloudinary**:

1. **Local Upload**: Files are temporarily stored using Multer
2. **Cloud Upload**: Files are uploaded to Cloudinary
3. **URL Return**: Cloudinary URL is returned for use in the frontend

### Upload Configuration

- **Multer**: Handles multipart/form-data
- **Cloudinary**: Cloud-based image management
- **File Validation**: Implemented in upload controllers

## ⚡ Performance

### Clustering

The server uses Node.js clustering to:
- Utilize all CPU cores
- Improve performance under load
- Automatically restart crashed workers
- Share TCP connections across workers

### Database Optimization

- Indexed fields for faster queries
- Mongoose connection pooling
- Efficient schema design with references

## 🔒 Security Features

- **Password Hashing**: Bcrypt with configurable salt rounds
- **JWT Tokens**: Secure token-based authentication
- **HttpOnly Cookies**: Prevents XSS attacks
- **CORS Protection**: Whitelisted origins only
- **Environment Variables**: Sensitive data in `.env`
- **Input Validation**: Request validation in controllers

## 🧪 Testing

Currently, no test suite is configured. To add testing:

```bash
npm install --save-dev jest supertest
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check `MONGO_DB_URI` in `.env`
   - Ensure MongoDB is running
   - Verify network connectivity

2. **JWT Token Errors**
   - Verify `SECRET` is set in `.env`
   - Check token expiration settings
   - Ensure cookies are enabled

3. **Cloudinary Upload Failures**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper file format

4. **CORS Errors**
   - Add frontend URL to allowed origins
   - Check `credentials: true` in CORS config

## 📄 License

ISC License

## 👤 Author

Ali Khan

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows existing patterns
- Authentication middleware is used for protected routes
- Error handling is implemented
- Environment variables are documented

---

For frontend documentation, see [Frontend README](../frontend/README.md)
