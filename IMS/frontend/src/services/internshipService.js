import api from './api';

export const internshipService = {
  // Get all internships
  getAllInternships: async () => {
    const response = await api.get('/internships/all-internships');
    return response.data;
  },

  // Get internship by ID
  getInternshipById: async (id) => {
    const response = await api.get(`/internships/internship-by-id/${id}`);
    return response.data;
  },

  // Create internship (admin only)
  createInternship: async (internshipData) => {
    const response = await api.post('/internships/create-internship', internshipData);
    return response.data;
  },

  // Update internship (admin only)
  updateInternship: async (id, internshipData) => {
    const response = await api.put(`/internships/update-internship/${id}`, internshipData);
    return response.data;
  },

  // Delete internship (admin only)
  deleteInternship: async (id) => {
    const response = await api.delete(`/internships/delte-internship/${id}`);
    return response.data;
  }
};

