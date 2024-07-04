import api from './api';

export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data; // Ensure we are returning the data property
};

export const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data; // Ensure we are returning the data property
};

