import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/users/login', credentials);
  return response.data; // Ensure we return the correct data format
};

export const register = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/users/register', credentials);
  return response.data;
};
