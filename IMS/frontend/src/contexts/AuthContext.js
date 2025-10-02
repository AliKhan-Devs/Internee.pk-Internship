import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const initAuth = async () => {
    try {
      const response = await authService.getCurrentUser(); // calls /auth/me
      if (response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.log("No active session");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  initAuth();
}, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { user: userData } = response;
      
      if (userData) {
        
        setUser(userData);
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      toast.success('Registration successful! Please login.');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const createAdmin = async (adminData) => {
    try {
      const response = await authService.createAdmin(adminData);
      toast.success('Admin created successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create admin';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    createAdmin,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isInternee: user?.role === 'internee'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

