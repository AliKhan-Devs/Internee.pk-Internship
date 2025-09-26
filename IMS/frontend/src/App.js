import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import TestTailwind from './TestTailwind';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/common/Dashboard';
import Internships from './pages/common/Internships';
import InternshipDetail from './pages/common/InternshipDetail';
import CreateInternship from './pages/admin/CreateInternship';
import Applications from './pages/admin/Applications';
import MyApplications from './pages/user/MyApplications';
import Users from './pages/admin/Users';
import Tasks from './pages/admin/Tasks';
import MyTasks from './pages/user/MyTasks';
import Feedback from './pages/admin/Feedback';
import CreateAdmin from './pages/admin/CreateAdmin';
import Profile from './pages/common/Profile';
import InternshipTaskDetails from './pages/user/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import PublicLayout from './components/Layout/PublicLayout';
import Home from './pages/Home';
import SeeUserTask from './pages/admin/SeeUserTask';

function App() {
  return (
    <div>
      <AppOriginal />
    </div>
  );
}

function AppOriginal() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <PublicLayout>
                <Home/>
              </PublicLayout>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/internships" element={
              <ProtectedRoute>
                <Layout>
                  <Internships />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/internships/:id" element={
              <ProtectedRoute>
                <Layout>
                  <InternshipDetail />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/internships/create" element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <CreateInternship />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/applications" element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <Applications />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-applications" element={
              <ProtectedRoute>
                <Layout>
                  <MyApplications />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/tasks" element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <Tasks />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-tasks" element={
              <ProtectedRoute>
                <Layout>
                  <MyTasks />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/tasks/application/:id" element={
              <ProtectedRoute>
                <Layout>
                  <SeeUserTask />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/my-tasks/internship/:id" element={
              <ProtectedRoute>
                <Layout>
                <InternshipTaskDetails/>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/feedback" element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <Feedback />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-admin" element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <CreateAdmin />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={
              <NotFoundPage/>
            } />
            
          </Routes>
          
        </div>
      </Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;