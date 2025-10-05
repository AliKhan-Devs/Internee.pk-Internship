import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Singup'
import Login from './pages/Login'

import ProtectedRoute from './components/protectedRoutes'

import AdminLayout from './components/layouts/AdminLayout'
import Profile from './pages/Admin/Profile'
import Overview from './pages/Admin/Sections'
import ThemeSelector from './pages/Admin/Theme'
import Contact from './pages/Admin/Contact'
import ViewPortfolio from './pages/ViewPortfolio'
import Dashboard from './pages/Admin/Dashboard'
import UsersPage from './pages/Users'
import Stats from './pages/Admin/Stats'
import Projects from './pages/Admin/Projects'
import Services from './pages/Admin/Services'
import Education from './pages/Admin/Education'
import Skills from './pages/Admin/Skills'
import Certificates from './pages/Admin/Certificates'
import Features from './pages/Features'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path='/users' element={<UsersPage />} />
        </Routes>
        <Routes>
          <Route path='/features' element={<Features/>} />
        </Routes>
        <Routes>
          <Route path='/users/:username' element={<ViewPortfolio />} />
        </Routes>
        <Routes>

          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>

            } />

          </Route>
          <Route path="/profile" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>

            } />

          </Route>

          <Route path="/overview" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Overview />

              </ProtectedRoute>

            } />
          </Route>
          <Route path="/theme" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <ThemeSelector />

              </ProtectedRoute>

            } />
          </Route>

          <Route path="/stats" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Stats />

              </ProtectedRoute>

            } />
          </Route>
          <Route path="/projects" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Projects />

              </ProtectedRoute>

            } />
          </Route>
          <Route path="/services" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Services />

              </ProtectedRoute>

            } />
          </Route>
          <Route path="/education" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Education />

              </ProtectedRoute>

            } />
          </Route>
          <Route path="/skills" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Skills />

              </ProtectedRoute>

            } />
          </Route>
          <Route path="/certificates" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Certificates />

              </ProtectedRoute>

            } />
          </Route>


          <Route path="/contact" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Contact />

              </ProtectedRoute>

            } />
          </Route>



        </Routes>

        <Routes>
          <Route path='/register' element={<Signup />} />
        </Routes>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


