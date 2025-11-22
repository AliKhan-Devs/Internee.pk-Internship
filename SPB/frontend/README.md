# PortaBuild Frontend

The frontend application for PortaBuild, built with React and Vite. This is a modern, responsive web application that provides an intuitive interface for users to create and manage their portfolios without any coding knowledge.

## 🚀 Features

- **Modern React Architecture** - Built with React 19 and latest hooks
- **Fast Development** - Vite for lightning-fast HMR and builds
- **Beautiful UI** - Tailwind CSS with Radix UI components
- **Smooth Animations** - Framer Motion for engaging user interactions
- **Progressive Web App** - Installable PWA with offline support
- **Responsive Design** - Mobile-first approach with full desktop support
- **Chart Visualizations** - Chart.js integration for analytics
- **Protected Routes** - Secure authentication-based routing
- **Context API** - Global state management for auth and portfolio data

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running (see [Backend README](../backend/README.md))

## 🛠️ Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (if needed)
   ```bash
   # Create .env file in frontend directory
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - The app will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (outputs to `dist/` folder)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── icons/             # PWA icons
│   └── images/            # Public images
├── src/
│   ├── components/        # Reusable React components
│   │   ├── layouts/       # Layout components (Navbar, Footer, AdminLayout)
│   │   └── ui/           # UI primitives (Button, Card, Dialog, Input, Label)
│   ├── context/          # React Context providers
│   │   ├── authContext.jsx
│   │   └── portfolioContext.jsx
│   ├── pages/            # Page components
│   │   ├── Admin/        # Admin dashboard pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Theme.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Certificates.jsx
│   │   │   └── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Singup.jsx
│   │   ├── ViewPortfolio.jsx
│   │   └── ...
│   ├── services/         # API service functions
│   │   └── portfolioService.jsx
│   ├── utils/            # Utility functions
│   │   └── api.jsx
│   ├── lib/              # Library configurations
│   │   └── utils.js
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── components.json       # shadcn/ui configuration
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Key Technologies

### Core
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **React Router DOM 7.9.3** - Client-side routing

### Styling
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **@tailwindcss/vite** - Tailwind integration for Vite
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-label`
  - `@radix-ui/react-slot`

### UI & Animation
- **Framer Motion 12.23.22** - Animation library
- **Lucide React 0.544.0** - Icon library
- **React Icons 5.5.0** - Additional icons
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

### Data Visualization
- **Chart.js 4.5.0** - Charting library
- **react-chartjs-2 5.3.0** - React wrapper for Chart.js
- **react-countup 6.5.3** - Animated number counting

### HTTP & State
- **Axios 1.12.2** - HTTP client for API calls
- **React Context API** - Global state management

### PWA
- **vite-plugin-pwa 1.0.3** - Progressive Web App support

## 🔐 Authentication Flow

The application uses JWT-based authentication:
1. User registers/logs in through `/register` or `/login`
2. JWT token is stored (typically in cookies or localStorage)
3. Protected routes check authentication via `ProtectedRoute` component
4. API calls include authentication tokens automatically

## 🛣️ Routing Structure

### Public Routes
- `/` - Home page
- `/overview` - Portfolio overview
- `/features` - Features page
- `/users` - Browse users
- `/users/:username` - View public portfolio
- `/register` - User registration
- `/login` - User login

### Protected Admin Routes
All admin routes are wrapped in `AdminLayout` and require authentication:
- `/dashboard` - Main dashboard
- `/profile` - User profile management
- `/theme` - Theme customization
- `/stats` - Analytics and statistics
- `/projects` - Project management
- `/services` - Services management
- `/education` - Education details
- `/skills` - Skills management
- `/certificates` - Certificates management
- `/contact` - Contact information

## 🎯 Key Components

### Layout Components
- **HomeNav** - Navigation bar for public pages
- **HomeFooter** - Footer for public pages
- **Navbar** - Navigation for authenticated users
- **AdminLayout** - Layout wrapper for admin pages

### UI Components
- **Button** - Customizable button component
- **Card** - Card container component
- **Dialog** - Modal dialog component
- **Input** - Form input component
- **Label** - Form label component
- **IconPicker** - Icon selection component
- **ImageUploader** - Image upload component
- **Modal** - Reusable modal component

### Utility Components
- **ProtectedRoute** - Route protection wrapper
- **RenderIcon** - Dynamic icon rendering

## 🔌 API Integration

The frontend communicates with the backend API through:
- **Axios** - Configured in `src/utils/api.jsx`
- **Service Layer** - `src/services/portfolioService.jsx` contains API call functions
- **Context Providers** - Manage API state and responses

## 🎨 Theming

The application supports:
- Multiple pre-built themes
- Custom theme configuration
- Dynamic theme switching
- Theme persistence

## 📱 Progressive Web App

The app is configured as a PWA with:
- Service worker for offline support
- Web app manifest
- Installable on mobile and desktop
- Cached assets for faster loading

## 🚀 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - The `dist/` folder contains the production-ready files
   - Deploy to Vercel, Netlify, or any static hosting service

## 🔧 Configuration

### Vite Configuration
- Located in `vite.config.js`
- Configured for React
- PWA plugin enabled
- Path aliases configured (e.g., `@/` for `src/`)

### Tailwind Configuration
- Utility-first CSS framework
- Custom theme configuration
- Responsive breakpoints

### ESLint
- Configured with React hooks rules
- Code quality checks
- Run with `npm run lint`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `vite.config.js` or use `npm run dev -- --port 3000`

2. **API connection errors**
   - Ensure backend server is running
   - Check `VITE_API_URL` in environment variables
   - Verify CORS configuration in backend

3. **Build errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript/ESLint errors

## 📝 Development Guidelines

- Use functional components with hooks
- Follow React best practices
- Maintain component reusability
- Use Context API for global state
- Keep components small and focused
- Use Tailwind utility classes for styling
- Follow the existing code structure

## 📄 License

ISC License

---

For backend setup and API documentation, see [Backend README](../backend/README.md)
