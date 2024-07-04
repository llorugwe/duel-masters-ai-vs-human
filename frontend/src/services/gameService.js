import api from './api';

export const createGameSession = async (gameData) => {
  const response = await api.post('/games/create', gameData);
  return response.data; // Ensure we are returning the data property
};

export const getGameSessions = async () => {
  const response = await api.get('/games');
  return response.data; // Ensure we are returning the data property
};

