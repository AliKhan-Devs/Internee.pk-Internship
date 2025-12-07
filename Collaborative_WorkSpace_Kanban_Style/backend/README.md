# ⚙️ Collaborative WorkSpace - Backend

This is the **backend API service** for the **Collaborative WorkSpace Kanban Board** application.  
It provides a comprehensive RESTful API built with **Node.js, Express, and MongoDB**, handling authentication, task management, section organization, and team collaboration features.

---

## 🚀 Features

- **JWT Authentication**: Secure token-based user authentication.
- **User Management**: Register, login, and manage user profiles.
- **Password Security**: Bcrypt hashing for secure password storage.
- **Section Management**: Create, read, update, and delete task sections.
- **Task CRUD Operations**: Complete task management with multiple properties.
- **Task Movement**: Move tasks between sections with history tracking.
- **CORS Support**: Enabled for cross-origin frontend communication.
- **Middleware Protection**: JWT middleware for protected routes.
- **Scalable Architecture**: Feature-based folder structure for maintainability.
- **File Upload Support**: Multer integration for user profile images.

---

## 🏗️ Folder Structure

```
backend/
│
├── server.js # Main entry point - Express app start
├── package.json # Dependencies and scripts
│
└── src/
 ├── config/
 │ └── db.config.js # MongoDB connection with Mongoose
 │
 ├── features/ # Feature-based modular structure
 │ ├── sections/
 │ │ ├── section.model.js # Mongoose schema & methods
 │ │ ├── section.controller.js # Request handlers
 │ │ └── section.routes.js # Route definitions
 │ │
 │ ├── tasks/
 │ │ ├── task.model.js # Task schema with static methods
 │ │ ├── task.controller.js # Task business logic
 │ │ └── task.routes.js # Task API routes
 │ │
 │ ├── user/
 │ │ ├── user.model.js # User schema
 │ │ ├── user.controller.js # Auth controller
 │ │ ├── user.service.js # User service functions
 │ │ └── user.routes.js # Auth endpoints
 │ │
 │ └── utils/
 │ └── file.utils.js # File upload helper functions
 │
 └── middlewares/
  └── jwt.middleware.js # JWT verification & user extraction
```

---

## 📊 Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  userPhoto: String (optional, URL or path)
}
```

### Section Schema
```javascript
{
  name: String (required),
  tasks: [ObjectId] (references to Task documents),
  timestamps: true
}
```

### Task Schema
```javascript
{
  name: String (required),
  description: String (required),
  dueDate: Date (required),
  assignee: String (required),
  section: ObjectId (references Section, required),
  timestamps: true
}
```

---

## 🔑 Authentication & Authorization

### JWT Flow
1. User registers with email and password
2. Password hashed with bcrypt before storing
3. On login, user receives JWT token
4. Token stored in localStorage on frontend
5. Token included in Authorization header: `Bearer <token>`
6. `jwtAuth` middleware verifies token on protected routes

### Protected Routes
All task and section endpoints require JWT authentication via `jwtAuth` middleware.

---

## ⚡ API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Section Routes (`/api/section`)
*All routes require JWT authentication*

#### Get All Sections
```
GET /api/section
Response: [{ _id, name, tasks, createdAt, updatedAt }]
```

#### Create Section
```
POST /api/section
Body: { name }
Response: { _id, name, tasks: [], createdAt, updatedAt }
```

#### Update Section
```
PUT /api/section/:id
Body: { name }
Response: Updated section object
```

#### Delete Section
```
DELETE /api/section/:id
Response: { message: "Section deleted" }
```

### Task Routes (`/api/task`)
*All routes require JWT authentication*

#### Get Tasks by Section
```
GET /api/task/:section
Response: [{ _id, name, description, dueDate, assignee, section }]
```

#### Create Task
```
POST /api/task
Body: { name, description, dueDate, assignee, section }
Response: Created task object
```

#### Update Task
```
PUT /api/task/:taskId
Body: { name?, description?, dueDate?, assignee? }
Response: Updated task object
```

#### Move Task to Different Section
```
PATCH /api/task/move
Body: { taskId, newSection }
Response: Updated task with new section
```

#### Delete Task
```
DELETE /api/task/:taskId
Response: { message: "Task deleted" }
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 16  
- MongoDB (local instance or MongoDB Atlas)  

### Installation Steps

1. Navigate to backend folder:
   ```bash
   cd Collaborative_WorkSpace_Kanban_Style/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in backend root:
   ```env
   MONGO_URI=mongodb://localhost/kanban_db
   PORT=5000
   JWT_SECRET=your_super_secret_key_change_this
   NODE_ENV=development
   ```

4. For MongoDB Atlas (cloud), use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kanban_db
   ```

5. Start development server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Database Connection

The `db.config.js` handles MongoDB connection:

```javascript
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};
```

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
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'

# Get all sections (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/section

# Create section
curl -X POST http://localhost:5000/api/section \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"To Do"}'

# Create task
curl -X POST http://localhost:5000/api/task \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Build Login Page",
    "description":"Create user authentication interface",
    "dueDate":"2024-12-31",
    "assignee":"John Doe",
    "section":"SECTION_ID"
  }'
```

### Using Postman:

1. Set base URL: `http://localhost:5000/api`
2. Create auth collection with login request
3. Use token from response in Authorization header
4. Test each endpoint with appropriate method and body

---

## 🔒 Security Considerations

- **Password Hashing**: All passwords hashed with bcrypt before storage
- **JWT Expiration**: Configure token expiration time in production
- **CORS**: Currently allows all origins - restrict in production
- **Input Validation**: Add request validation middleware for production
- **Environment Variables**: Never commit `.env` file
- **HTTPS**: Use in production for secure token transmission

---

## 🔧 Configuration

### Environment Variables
- `MONGO_URI` – MongoDB connection string
- `PORT` – Server port (default: 5000)
- `JWT_SECRET` – Secret key for token signing
- `NODE_ENV` – Environment (development/production)

### Middleware Stack
1. CORS (Cross-Origin Resource Sharing)
2. Body Parser (JSON parsing)
3. JWT Authentication (on protected routes)

---

## 🔮 Future Enhancements

- Add **Request Validation** middleware (joi/yup)
- Implement **Rate Limiting** for API endpoints
- Add **Error Handling** middleware with custom error codes
- Create **API Documentation** with Swagger/OpenAPI
- Implement **Logging** system (Winston/Morgan)
- Add **Task Comments** feature
- Implement **Activity Tracking** (who did what when)
- Add **Role-based Access Control** (RBAC)
- Create **Automated Tests** (Jest/Mocha)
- Implement **WebSocket** for real-time updates

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running (`mongod` locally)
- Check MONGO_URI is correct in .env
- For Atlas, ensure IP whitelist includes your IP

### JWT Token Errors
- Verify JWT_SECRET matches in .env
- Check token format: `Authorization: Bearer <token>`
- Token might be expired - login again

### CORS Errors
- Verify frontend URL in CORS origin check
- Check if credentials are needed (withCredentials)

### Port Already in Use
- Change PORT in .env
- Or kill process: `lsof -i :5000` then `kill -9 <PID>`

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the Collaborative WorkSpace Kanban application.**
