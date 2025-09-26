import api from './api';

export const feedbackService = {
  // Submit feedback (admin only)
  submitFeedback: async (submissionId, feedbackData) => {
    const response = await api.post(`/feedback/submit-feedback/${submissionId}`, feedbackData);
    return response.data;
  },

  // Get feedback by submission
  getFeedbackBySubmission: async (submissionId) => {
    const response = await api.get(`/feedback/get-feedback/submission/${submissionId}`);
    return response.data;
  },

  // Update feedback (admin only)
  updateFeedback: async (id, feedbackData) => {
    const response = await api.put(`/feedback/update-feedback/${id}`, feedbackData);
    return response.data;
  },

  // Delete feedback (admin only)
  deleteFeedback: async (id) => {
    const response = await api.delete(`/feedback/delete-feedback/${id}`);
    return response.data;
  }
};

