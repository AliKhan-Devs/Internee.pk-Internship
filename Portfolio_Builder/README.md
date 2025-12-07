# PortaBuild 🚀

**Build Your Professional Portfolio Without Writing a Single Line of Code**

PortaBuild is a powerful, no-code portfolio builder platform that empowers users to create stunning, personalized portfolios with complete control over every detail. Whether you're a student, professional, or creative, PortaBuild makes it easy to showcase your work, skills, and achievements.

## ✨ Features

- **🎨 No-Code Portfolio Creation** - Build beautiful portfolios through an intuitive drag-and-drop interface
- **🎭 Customizable Themes** - Choose from multiple pre-designed themes or customize your own
- **📱 Fully Responsive** - Your portfolio looks perfect on desktop, tablet, and mobile devices
- **🔧 Granular Control** - Customize every element including buttons, cards, icons, and layouts
- **📊 Analytics Dashboard** - Track portfolio views and visitor engagement
- **👤 User Profiles** - Manage your personal information, skills, education, and projects
- **📸 Image Upload** - Easily upload and manage images using Cloudinary integration
- **🔐 Secure Authentication** - JWT-based authentication for secure access
- **🌐 Public Portfolio URLs** - Share your portfolio with a unique username-based URL
- **📈 Real-time Statistics** - Monitor your portfolio performance with detailed analytics

## 🏗️ Project Structure

```
SPB/
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express backend API
└── SDLC/              # Software Development Life Cycle documents
```
## Project Archetecture
 
```
## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SPB
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with your configuration
   npm start
   ```

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

For detailed setup instructions, please refer to the individual README files:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Cloudinary** - Image management
- **Multer** - File upload handling
- **Bcrypt** - Password hashing

## 📋 Core Functionality

### Portfolio Management
- Create and customize portfolio sections
- Manage profile information
- Add projects, skills, education, and certificates
- Configure contact information
- Customize themes and styling

### User Features
- User registration and authentication
- Dashboard for portfolio management
- Analytics and statistics tracking
- Public portfolio viewing
- Image upload and management

### Admin Features
- User management
- Portfolio overview
- Theme customization
- Section management
- Contact form handling

## 🌐 API Endpoints

The backend provides RESTful APIs for:
- Authentication (`/user`)
- Portfolio management (`/portfolio`)
- Theme customization (`/theme`)
- Section management (`/section`)
- Contact handling (`/contact`)
- Image uploads (`/upload`)
- Analytics (`/analytics`)
- User profiles (`/users`)

## 📱 Progressive Web App

The frontend is configured as a Progressive Web App (PWA), allowing users to install it on their devices for a native app-like experience.

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Secure cookie handling
- Environment variable configuration

## 📄 License

ISC License

## 👥 Author

Ali Khan

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**PortaBuild** - Build your portfolio, showcase your talent, land your dream job. 🎯

