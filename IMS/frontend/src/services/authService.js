import api from './api';

export const authService = {
  // User registration
  register: async (userData) => {
    const response = await api.post('/user/create-user', userData);
    return response.data;
  },

  // User login
  login: async (credentials) => {
    const response = await api.post('/user/login', credentials);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },

  // Create admin (admin only)
  createAdmin: async (adminData) => {
    const response = await api.post('/user/create-admin', adminData);
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    const response = await api.get('/user/all-users');
    return response.data;
  },

  // update user (admin only)
  updateUser: async (userId, userData) => {
    const response = await api.put(`/user/update-user/${userId}`, userData);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

