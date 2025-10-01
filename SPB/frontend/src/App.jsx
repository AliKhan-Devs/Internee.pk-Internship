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

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path='/:username' element={<ViewPortfolio />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>

            } />

          </Route>
          <Route path="/dashboard/overview" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <Overview />
                
              </ProtectedRoute>

            } /> 
          </Route>
          <Route path="/dashboard/theme" element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute>
                <ThemeSelector />
                
              </ProtectedRoute>

            } /> 
          </Route>
          <Route path="/dashboard/contact" element={<AdminLayout />}>
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


