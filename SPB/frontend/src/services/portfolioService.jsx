// src/api/portfolioService.js

// services/portfolioService.js
import api from "../utils/api";

export const getPortfolio = async (username) => {
  const res = await api.get(`/portfolio/${username}`);
  return res.data.portfolio;
};

export const updateProfile = async (id, data) => {
  const res = await api.put(`/section/profile/${id}`, data, { withCredentials: true });
  return res.data;
};

