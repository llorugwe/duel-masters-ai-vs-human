import api from './api';

export const createGameSession = async (gameData) => {
  const response = await api.post('/games/create', gameData);
  return response.data;
};

export const getGameSessions = async () => {
  const response = await api.get('/games');
  return response.data;
};
