# ⚙️ Auto Task Reminder - Backend

This is the **backend service** for the **Auto Task Reminder** application.  
It provides a RESTful API built with **Node.js, Express, and MongoDB**, handling all task management operations, scheduling, and data persistence.

---

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete tasks efficiently.
- **MongoDB Integration**: Persistent data storage with Mongoose schema.
- **RESTful API**: Clean and organized API endpoints for task management.
- **CORS Support**: Enable cross-origin requests for frontend communication.
- **Request Logging**: Morgan middleware for tracking HTTP requests.
- **Task Metadata**: Store title, description, tags, completion status, and dates.
- **Timestamps**: Automatic creation and update timestamps for audit trails.
- **Scalable Architecture**: Modular folder structure for easy maintenance.

---

## 🏗️ Folder Structure

```
server/
│
├── index.js # Entry point for the application
├── app.js # Express app configuration
├── config.js # Configuration (port, environment variables)
├── database.js # MongoDB connection setup
├── package.json # Dependencies and scripts
│
├── models/ # Mongoose schemas
│ └── task.js # Task schema with fields: title, description, done, tags, date
│
├── routes/ # API route definitions
│ └── tasks.routes.js # Task endpoints (GET, POST, PUT, DELETE)
│
└── controller/ # Request handlers & business logic
 └── tasks.controller.js # Task CRUD operations
```

---

## 📊 Task Model Schema

```javascript
{
  title: String (required, trimmed),
  description: String (required),
  done: Boolean (default: false),
  tags: [String] (optional, trimmed),
  date: Date (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## ⚡ API Endpoints

### All endpoints are prefixed with `/api/tasks`

#### Get All Tasks
```
GET /api/tasks
```
Returns: Array of all tasks

#### Get Single Task
```
GET /api/tasks/:id
```
**Parameters**: 
- `id` (string): Task ID

Returns: Single task object

#### Create Task
```
POST /api/tasks
```
**Body**:
```json
{
  "title": "Complete project",
  "description": "Finish the MERN project",
  "tags": ["work", "urgent"],
  "date": "2024-12-31T10:00:00Z"
}
```

Returns: Created task object

#### Update Task
```
PUT /api/tasks/:id
```
**Parameters**: 
- `id` (string): Task ID

**Body** (all fields optional):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "done": true,
  "tags": ["updated"],
  "date": "2024-12-31T10:00:00Z"
}
```

Returns: Updated task object

#### Delete Task
```
DELETE /api/tasks/:id
```
**Parameters**: 
- `id` (string): Task ID

Returns: 204 No Content on success, 404 if not found

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 16  
- MongoDB (local instance or MongoDB Atlas)  

### Installation

1. Navigate to the server folder:
   ```bash
   cd Auto_Task_Reminder/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection in `database.js`:
   ```javascript
   const URI = "mongodb://localhost/mern-crud-test";
   // Or use MongoDB Atlas URI
   // const URI = "mongodb+srv://username:password@cluster.mongodb.net/dbname";
   ```

4. (Optional) Create a `.env` file for environment variables:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost/mern-crud-test
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:4000` (or PORT from config)

---

## 📜 Available Scripts

```bash
# Development mode with auto-reload (nodemon)
npm run dev

# Start server without auto-reload
npm start

# Build (if applicable)
npm run build
```

---

## 🔧 Configuration

The `config.js` file manages environment settings:

```javascript
export const port = process.env.PORT || 4000;
```

You can override the port by setting the `PORT` environment variable or modifying the file directly.

---

## 🗄️ Database Connection

The `database.js` file handles MongoDB connection:

```javascript
import mongoose from "mongoose";

const URI = "mongodb://localhost/mern-crud-test";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log("DB is connected", conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};
```

**Note**: Update the `URI` for your MongoDB setup (local or Atlas).

---

## 📡 Testing the API

### Using curl:

```bash
# Get all tasks
curl http://localhost:4000/api/tasks

# Get single task
curl http://localhost:4000/api/tasks/task_id

# Create task
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task details"}'

# Update task
curl -X PUT http://localhost:4000/api/tasks/task_id \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

# Delete task
curl -X DELETE http://localhost:4000/api/tasks/task_id
```

### Using Postman:

1. Import the API collection or manually create requests
2. Base URL: `http://localhost:4000/api/tasks`
3. Test each endpoint with appropriate methods and payloads

---

## 🔮 Future Enhancements

- Add **Authentication & Authorization** for multi-user support
- Implement **Cron Job Integration** for automatic reminders
- Add **Email/SMS Notifications** when task reminders trigger
- Implement **Task Priority & Categories**
- Add **Recurring Tasks** functionality
- Add **API Validation** middleware for request validation
- Implement **Rate Limiting** for production
- Add **Comprehensive Error Handling** with custom error codes
- Create **API Documentation** with Swagger/OpenAPI

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally (`mongod`) or check Atlas connection string
- Verify the URI in `database.js` is correct

### Port Already in Use
- Change PORT in `config.js` or kill the process using port 4000

### CORS Errors
- Verify CORS is enabled in `app.js`: `app.use(cors())`
- Update frontend API base URL if backend runs on different port

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the Auto Task Reminder MERN Stack project.**
