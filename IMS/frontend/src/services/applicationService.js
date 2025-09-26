
import api from './api';

export const applicationService = {
  // Get user's applications
  getMyApplications: async () => {
    const response = await api.get('/application/my-applications');
    return response.data;
  },

  // Get all applications (admin only)
  getAllApplications: async () => {
    const response = await api.get('/application/all-applications');
    return response.data;
  },

  // Apply for internship
  applyForInternship: async (internshipId) => {
    const response = await api.post(`/application/apply/${internshipId}`);
    return response.data;
  },

  // Update application status (admin only)
  updateApplication: async (id, status) => {
    const response = await api.put(`/application/${id}`, { status });
    return response.data;
  }
,
  // get application by id
  getApplicationById: async (id) => {
    const response = await api.get(`/application/${id}`);
    return response.data;
  }
};

