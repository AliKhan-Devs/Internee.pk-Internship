import api from './api';

export const taskService = {


  // Get user tasks for user
  getMyTasks:async ()=>{
    const response = await api.get('/task/my-tasks');
    return response.data;
  },

  // get task by application id for admin
 getApplicationTasks:async (applicationId)=>{
    const response = await api.get(`/task/get-tasks/application/${applicationId}`);
    return response.data;
  },
  
  // Get tasks by internship
  getTasksByInternship: async (internshipId) => {
    const response = await api.get(`/task/by-internship/${internshipId}`);
    return response.data;
  },

  // Create task (admin only)
  createTask: async (internshipId, taskData) => {
    const response = await api.post(`/task/create-task/${internshipId}`, taskData);
    return response.data;
  },

  // Update task (admin only)
  updateTask: async (id, taskData) => {
    const response = await api.put(`/task/update-task/${id}`, taskData);
    return response.data;
  },

  // Delete task (admin only)
  deleteTask: async (id) => {
    const response = await api.delete(`/task/delete-task/${id}`);
    return response.data;
  },

};

