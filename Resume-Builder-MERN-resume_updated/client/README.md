# 🎨 Resume Builder - Frontend

This is the **frontend application** for the **Resume Builder MERN**.  
Built with **React 18**, **Vite**, **Material-UI**, and **Redux**, it provides a modern, intuitive interface for creating, customizing, and exporting professional resumes with multiple templates and export options.

---

## 🚀 Features

- **Multi-Step Resume Creation**: Guided form-based resume building process.
- **Multiple Resume Templates**: 2+ professionally designed templates to choose from.
- **Real-time Preview**: Live resume preview as you fill in details.
- **Rich Text Editing**: React Quill editor for detailed descriptions.
- **Export Options**: Download as PDF, DOCX, or print to PDF.
- **Google Sign-In**: Firebase-based authentication with Google.
- **Redux State Management**: Persistent state with Redux Persist.
- **Responsive Design**: Mobile-friendly UI with Material-UI components.
- **Form Validation**: Client-side validation for all resume fields.
- **Notifications**: Toast notifications for user feedback.
- **User Profiles**: Store and manage user information.

---

## 🏗️ Folder Structure

```
client/
│
├── package.json # Dependencies and scripts
├── vite.config.js # Vite bundler configuration
├── index.html # Main HTML file
├── .env.example # Environment variables template
│
└── src/
 ├── App.jsx # Main router with routes
 ├── main.jsx # React entry point
 ├── App.css # App styles
 ├── index.css # Global styles
 ├── api.js # API base URL configuration
 ├── firebase.js # Firebase configuration
 │
 ├── pages/ # Page components
 │ ├── LandingPage.jsx # Welcome/landing page
 │ ├── Home.jsx # Resume creation form page
 │ ├── Resume.jsx # Resume display/preview page
 │ ├── Templates.jsx # Template selection page
 │ ├── UserProfile.jsx # User profile settings
 │ ├── Contact.jsx # Contact form page
 │ ├── Data.jsx # Resume data display page
 │ ├── Demo.jsx # Demo/tutorial page
 │ ├── ErrorPage.jsx # 404 error page
 │ └── Auth/
 │ └── SignIn.jsx # Google Sign-In authentication page
 │
 ├── components/
 │ ├── Navbar.jsx # Navigation header
 │ ├── Layout.jsx # Main layout wrapper
 │ ├── ResumeLayout.jsx # Resume editing layout wrapper
 │ ├── Loader.jsx # Loading spinner component
 │ │
 │ ├── Form Components (Resume Sections)
 │ ├── Profile.jsx # Personal information form
 │ ├── Education.jsx # Education details form
 │ ├── Experience.jsx # Work experience form
 │ ├── Projects.jsx # Portfolio projects form
 │ ├── ExtraDetails.jsx # Skills and certifications form
 │ ├── Contact.jsx # Contact information form
 │ ├── Feedback.jsx # User feedback form
 │ │
 │ └── ResumeTemplates/ # Resume display templates
 │ ├── Template1.jsx # Modern single-column template
 │ └── Template2.jsx # Two-column professional template
 │
 ├── redux/ # Redux Toolkit state management
 │ ├── store.js # Redux store with persist
 │ ├── profileSlice.js # Profile state & reducers
 │ ├── educationSlice.js # Education state & reducers
 │ ├── experienceSlice.js # Experience state & reducers
 │ ├── projectSlice.js # Projects state & reducers
 │ ├── extraDetailsSlice.js # Skills/extra info state
 │ └── userSlice.js # User authentication state
 │
 ├── styles/ # CSS stylesheets
 │ ├── styles.css # Global styles
 │ ├── Home.css # Home/form page styles
 │ ├── LandingPage.css # Landing page styles
 │ ├── Navbar.css # Navigation styles
 │ ├── resumetemplate1.css # Template 1 styles
 │ ├── resumetemplate2.css # Template 2 styles
 │ ├── template.css # Template utilities
 │ ├── Loader.css # Loader animation styles
 │ ├── ErrorPage.css # Error page styles
 │ └── userProfile.css # User profile styles
 │
 └── assets/ # Static files
  └── back.avif # Background image
```

---

## 🔑 Key Components

### App.jsx
Root component with React Router setup:
- Route definitions for all pages
- Layout structure with Navbar
- Protected routes (authenticated vs public)
- Redux store and Firebase providers

```jsx
<Provider store={store}>
  <PersistGate loading={<Loader />} persistor={persistor}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/user-profile" element={<UserProfile />} />
          ...
        </Route>
      </Routes>
    </BrowserRouter>
  </PersistGate>
</Provider>
```

### ResumeLayout Component
Wrapper layout for resume creation forms with:
- Left sidebar with form sections
- Right side with live preview
- Navigation between sections
- Progress tracking

### Form Components
Each section form handles specific resume data:
- **Profile**: Personal details, contact info, social links
- **Education**: College, higher secondary, school details
- **Experience**: Job roles, descriptions, dates
- **Projects**: Project titles, links, tech stack
- **ExtraDetails**: Skills, certifications, languages

### Resume Templates
Display components that render resume based on selected template:
- **Template1**: Single-column modern design
- **Template2**: Two-column professional layout
- Use Redux state to populate data
- CSS classes for styling

---

## 📦 Redux State Structure

### Store Configuration (`redux/store.js`)
```javascript
{
  profileDetails: { ...profileData },
  educationDetails: { ...educationData },
  experienceDetails: [{ ...experienceData }],
  projectDetails: [{ ...projectData }],
  extraDetails: { ...extraData },
  user: { ...userData }
}
```

### Redux Slices
Each slice manages state for specific resume section:
- **profileSlice**: First/last name, email, phone, socials
- **educationSlice**: All education qualifications
- **experienceSlice**: Work experience history
- **projectSlice**: Portfolio projects
- **extraDetailsSlice**: Skills, certifications, languages
- **userSlice**: User authentication and profile

### Redux Persist
Automatically saves state to localStorage:
```javascript
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const persistor = persistStore(store);
```

---

## 🌐 API Integration

### Axios Configuration (`api.js`)
```javascript
export const BASE_URL = "https://resume-builder-zkad.onrender.com/api"
```

API calls made to:
- `/api/auth/google-sign-in` – Google authentication
- `/api/data/resume-data` – Save resume data
- `/api/data/get-all-resume-data` – Retrieve resume data

---

## 📥 Export Features

### PDF Export Options
1. **jsPDF + html2canvas**: Converts HTML to PDF with images
2. **react-to-pdf**: Simple PDF export with library
3. **html2pdf.js**: Full HTML to PDF conversion
4. **html-pdf**: Puppeteer-based PDF generation

### DOCX Export
- **docxtemplater**: Export resume to Word format
- Maintains formatting and structure
- Editable in Microsoft Word

### Print to PDF
- **react-to-print**: Native browser print dialog
- Save as PDF through print menu

### DOM Export
- **dom-to-image**: Convert resume to image
- **dom-to-pdf**: Convert DOM directly to PDF

---

## 🎨 Material-UI Components Used

- **TextField** – Input fields for forms
- **Button** – Action buttons
- **Select** – Dropdown selections
- **DatePicker** – Date input fields
- **Card** – Container components
- **Grid** – Layout system
- **Typography** – Text components
- **Icons** – MUI icon library
- **Dialog** – Modal forms
- **Tabs** – Section navigation

---

## 🎯 User Workflows

### Resume Creation Flow
1. Land on Landing Page
2. Click "Create Resume"
3. Google Sign-In (if not authenticated)
4. Select Resume Template
5. Fill Resume Sections:
   - Profile (Personal Info)
   - Education
   - Experience
   - Projects
   - Extra Details
6. Preview Resume in Real-time
7. Export as PDF/DOCX
8. Save to Account

### Templates Selection
1. Go to Templates Page
2. View Template Previews
3. Click "Use Template"
4. Navigate to Resume Creation
5. Form auto-populates template structure

### Export Resume
1. Complete all resume sections
2. Click "Download" button
3. Choose format (PDF/DOCX)
4. File downloads to device

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16  
- Firebase Project (for Google Sign-In)  

### Installation Steps

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
   VITE_FIREBASE_AUTH_DOMAIN=resume-builder-97419.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=resume-builder-97419
   VITE_FIREBASE_STORAGE_BUCKET=resume-builder-97419.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1049637171309
   VITE_FIREBASE_APP_ID=1:1049637171309:web:309feb043ca848892b8f64
   ```

4. Update API base URL in `src/api.js`:
   ```javascript
   export const BASE_URL = "http://localhost:8080/api"
   ```

5. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

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

## 🔄 Development Workflow

1. **Start Backend**: `npm run dev` from server folder
2. **Start Frontend**: `npm run dev` from client folder
3. **Edit Components**: Modify React files in `src/components` or `src/pages`
4. **Redux Actions**: Update slice files to change state
5. **Test Export**: Try exporting resume in different formats
6. **Check Console**: View Redux actions and API calls

---

## 🧪 Testing Checklist

- [ ] Google Sign-In works correctly
- [ ] User can navigate through resume sections
- [ ] Form data persists on page reload (Redux Persist)
- [ ] Real-time preview updates as data changes
- [ ] All export formats work (PDF, DOCX, Print)
- [ ] Multiple templates display correctly
- [ ] Form validation prevents invalid data
- [ ] Responsive design works on mobile
- [ ] API calls save resume data successfully
- [ ] User profile page loads data correctly
- [ ] Toast notifications appear for actions
- [ ] Logout clears user data properly

---

## 🔮 Future Enhancements

- Add **More Resume Templates** (5+ options)
- Implement **Template Customization Editor**
- Add **Font & Color Selection**
- Create **Resume Version Control** (save multiple versions)
- Add **Resume Sharing** via unique link
- Implement **Collaboration** features
- Add **Resume Analytics** (downloads, views)
- Create **ATS Optimization** checker
- Add **Interview Preparation** tips
- Implement **Real-time Preview** toggle
- Add **Drag & Drop** section reordering
- Create **Resume Cover Letter** builder

---

## 🐛 Troubleshooting

### Firebase Authentication Not Working
- Verify Firebase API keys in .env.local
- Check Firebase Console configuration
- Ensure Google Sign-In enabled in Firebase

### Redux State Not Persisting
- Clear browser localStorage and reload
- Check Redux Persist configuration
- Verify Redux DevTools shows state updates

### Export Not Working
- Check all resume sections have data
- Verify PDF generation libraries installed
- Try different export format if one fails
- Check browser console for errors

### Form Validation Issues
- Ensure required fields are filled
- Check field format requirements
- Clear form cache if validation stuck
- Check Redux state for corrupted data

### API Connection Error
- Verify backend server running
- Check API base URL in api.js
- Ensure CORS enabled on backend
- Check network tab in DevTools

---

## 📝 License

This project is licensed under the ISC License.

---

**Part of the Resume Builder MERN application.**
