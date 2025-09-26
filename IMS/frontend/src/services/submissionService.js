
import api from './api';

export const submissionService = {
  // Submit task
  submitTask: async (taskId, submissionData) => {
    const response = await api.post(`/submission/create-submission/task/${taskId}`, submissionData);
    return response.data;
  },

  // Get submission by task
  getSubmissionByTask: async (taskId) => {
    const response = await api.get(`/submission/get-submission/task/${taskId}`);
    return response.data;
  },

  // Update submission (admin only)
  updateSubmission: async (id, status) => {
    const response = await api.put(`/submission/update-submission/${id}`, { status });
    return response.data;
  },

  // Get all submissions
  getAllSubmissions: async () => {
    const response = await api.get('/submission/get-all-submissions');
    return response.data;
  },

  // Get submission by internship
  getSubmissionByInternship: async (internshipId) => {
    const response = await api.get(`/submission/get-submission/internship/${internshipId}`);
    return response.data;
  },

  getSubmissionByTaskAndUser: async (taskId, userId) => {
    const response = await api.get(`/submission/get-submission/task/${taskId}/user/${userId}`);
    return response.data;
  },
};

