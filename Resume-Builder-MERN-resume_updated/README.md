# 📝 Resume Builder MERN

A comprehensive **full-stack Resume Builder application** built with the **MERN Stack** that enables users to create, customize, and download professional resumes. Features multiple resume templates, real-time preview, and export to PDF/DOCX formats.

---

## 🚀 Features

### Resume Creation & Management
- **Profile Information**: Add personal details (name, email, phone, address, social links).
- **Education Details**: Track multiple educational qualifications (college, school, higher secondary).
- **Work Experience**: Document professional roles and responsibilities.
- **Projects**: Showcase portfolio projects with links and tech stack.
- **Extra Details**: Add skills, certifications, and additional information.

### Resume Templates
- **Multiple Templates**: Choose from 2+ professionally designed resume templates.
- **Real-time Preview**: See resume changes instantly as you edit.
- **Template Customization**: Adjust template appearance and layout.
- **Live Preview**: Dynamic resume display while filling details.

### Export & Download
- **PDF Export**: Download resume as PDF using jsPDF and html2canvas.
- **DOCX Export**: Export resume as Word document with docxtemplater.
- **Print Support**: Print resume directly from browser using react-to-print.
- **Multiple Format Options**: Choose preferred download format.

### Authentication
- **Google Sign-In**: Firebase-based Google authentication.
- **User Registration**: Create accounts with email and password.
- **Session Persistence**: Redux Persist for maintaining user session.

### User Features
- **User Profiles**: Store user information and resume data.
- **Feedback System**: Collect user feedback and suggestions.
- **Templates Showcase**: View available resume templates before selection.
- **Contact Form**: User contact and support section.

---

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite  
- **Styling**: Material-UI (MUI) + CSS  
- **State Management**: Redux Toolkit + Redux Persist  
- **Routing**: React Router v6  
- **PDF Generation**: jsPDF, html2canvas, react-to-pdf, react-to-print  
- **Document Generation**: docxtemplater, dom-to-image, html-pdf  
- **PDF Viewer**: @react-pdf-viewer  
- **Rich Text Editor**: React Quill  
- **Date Picker**: MUI X Date Pickers  
- **Icons**: MUI Icons  
- **Animations**: Framer Motion  
- **HTTP Client**: Axios  
- **Notifications**: React Toastify  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: Firebase + JWT  
- **Password Security**: Bcrypt  

---

## 📂 Project Structure

```
Resume-Builder-MERN-resume_updated/
│
├── client/ # React Frontend Application
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite configuration
│ ├── index.html # Main HTML file
│ ├── .env.example # Environment variables template
│ │
│ └── src/
│ ├── App.jsx # Main router component
│ ├── main.jsx # Entry point
│ ├── App.css # App styles
│ ├── index.css # Global styles
│ ├── api.js # API base URL configuration
│ ├── firebase.js # Firebase configuration
│ │
│ ├── pages/ # Page components
│ │ ├── LandingPage.jsx # Landing/welcome page
│ │ ├── Home.jsx # Resume creation page
│ │ ├── Resume.jsx # Resume preview & display
│ │ ├── Templates.jsx # Template selection page
│ │ ├── UserProfile.jsx # User profile management
│ │ ├── Contact.jsx # Contact form page
│ │ ├── Data.jsx # Resume data display
│ │ ├── Demo.jsx # Demo/tutorial page
│ │ ├── ErrorPage.jsx # 404 error page
│ │ └── Auth/
│ │ └── SignIn.jsx # Google sign-in page
│ │
│ ├── components/
│ │ ├── Navbar.jsx # Navigation header
│ │ ├── Layout.jsx # Main layout wrapper
│ │ ├── ResumeLayout.jsx # Resume editing layout
│ │ ├── Loader.jsx # Loading spinner component
│ │ │
│ │ ├── Form Components (for resume sections)
│ │ ├── Profile.jsx # Personal info form
│ │ ├── Education.jsx # Education form
│ │ ├── Experience.jsx # Work experience form
│ │ ├── Projects.jsx # Projects form
│ │ ├── ExtraDetails.jsx # Skills and extra info form
│ │ ├── Contact.jsx # Contact form
│ │ ├── Feedback.jsx # Feedback form
│ │ │
│ │ └── ResumeTemplates/ # Resume template components
│ │ ├── Template1.jsx # Template 1 design
│ │ └── Template2.jsx # Template 2 design
│ │
│ ├── redux/ # Redux state management
│ │ ├── store.js # Redux store with persist
│ │ ├── profileSlice.js # Profile state & actions
│ │ ├── educationSlice.js # Education state & actions
│ │ ├── experienceSlice.js # Experience state & actions
│ │ ├── projectSlice.js # Projects state & actions
│ │ ├── extraDetailsSlice.js # Extra details state & actions
│ │ └── userSlice.js # User authentication state
│ │
│ ├── styles/ # CSS stylesheets
│ │ ├── styles.css # Global styles
│ │ ├── Home.css # Home page styles
│ │ ├── LandingPage.css # Landing page styles
│ │ ├── Navbar.css # Navigation styles
│ │ ├── resumetemplate1.css # Template 1 styles
│ │ ├── resumetemplate2.css # Template 2 styles
│ │ ├── template.css # Template utilities
│ │ ├── Loader.css # Loader animation styles
│ │ ├── ErrorPage.css # Error page styles
│ │ └── userProfile.css # User profile styles
│ │
│ └── assets/ # Static files (images, etc.)
│ └── back.avif # Background image
│
└── server/ # Node.js + Express Backend
 ├── index.js # Entry point
 ├── package.json # Backend dependencies
 ├── .env.example # Environment variables template
 │
 ├── config/
 │ └── db.js # MongoDB connection configuration
 │
 ├── routes/
 │ ├── auth.route.js # Authentication routes (Google Sign-In)
 │ ├── user.route.js # User management routes
 │ └── resume.route.js # Resume data routes
 │
 ├── controllers/
 │ ├── auth.controller.js # Auth logic (Google Sign-In)
 │ ├── user.controller.js # User management logic
 │ └── resume.controller.js # Resume CRUD operations
 │
 ├── models/
 │ ├── user.model.js # User schema
 │ └── resume.model.js # Resume data schema
 │
 └── utils/
  ├── authHelper.js # Authentication utilities
  └── verifyUser.js # JWT user verification middleware
```

---

## ⚡ API Overview

### Authentication Routes (`/api/auth`)
- `POST /api/auth/google-sign-in` – Authenticate with Google

### User Routes (`/api/user`)
- `GET /api/user/profile` – Get user profile
- `PUT /api/user/profile` – Update user profile
- `POST /api/user/feedback` – Submit feedback

### Resume Data Routes (`/api/data`)
- `POST /api/data/resume-data` – Save resume data
- `GET /api/data/get-all-resume-data` – Retrieve all resume data

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- MongoDB (local or Atlas)  
- Firebase Project (for Google Sign-In)  

### Backend Setup

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
   MONGO_URI=mongodb://localhost/resume_builder_db
   PORT=8080
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   FIREBASE_DATABASE_URL=your_firebase_db_url
   ```

4. Start backend server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:8080`

### Frontend Setup

1. Navigate to client folder:
   ```bash
   cd Resume-Builder-MERN-resume_updated/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_API_URL=http://localhost:8080/api
   ```

4. Start frontend development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

---

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from server folder
2. **Start Frontend**: `npm run dev` from client folder
3. **Make Changes**: Edit components or controllers
4. **Hot Reload**: Changes reflect automatically
5. **Test Functionality**: Use the application to create resumes

---

## 📥 Resume Export Features

### PDF Export
- Download resume as PDF using jsPDF and html2canvas
- Supports multiple templates
- Print-friendly format

### DOCX Export
- Export to Microsoft Word format using docxtemplater
- Maintains formatting and structure
- Editable document

### Print to PDF
- Print directly from browser
- Save as PDF using print dialog
- Full page capture

---

## 🎨 Resume Templates

### Template 1
Professional single-column layout with:
- Clean header with contact info
- Organized sections (Education, Experience, Projects, Skills)
- Color-coded section headers

### Template 2
Modern two-column layout with:
- Left sidebar for skills and quick info
- Right content area for detailed information
- Enhanced visual hierarchy

---

## 🔮 Future Enhancements

- Add **Template Customization Editor**
- Implement **Theme Selection** (colors, fonts)
- Add **Resume Version Control** (save multiple versions)
- Create **Template Library** (more templates)
- Add **Resume Sharing** via link
- Implement **Real-time Collaboration**
- Add **Resume Analytics** (views, downloads)
- Create **Interview Preparation** tips
- Add **ATS Optimization** suggestions
- Implement **Resume Comparison** feature

---

## 🔐 Security Notes

- **Firebase Authentication**: Secure Google Sign-In implementation
- **JWT Tokens**: Session-based user authentication
- **Password Hashing**: Bcrypt for password security
- **User Data Privacy**: MongoDB encryption at rest
- **CORS**: Configured for frontend communication

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙋 Support

For issues or questions, feel free to reach out or create an issue in the repository.

---

**Built as a complete resume builder solution for job seekers.**
