import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameSession() {
  const [gameSessions, setGameSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGameSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/game-sessions', {
          headers: { 'x-auth-token': token },
        });
        setGameSessions(response.data);
      } catch (error) {
        setMessage('Error: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchGameSessions();
  }, []);

  const handleStartGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/game-sessions', {}, {
        headers: { 'x-auth-token': token },
      });
      setGameSessions([...gameSessions, response.data]);
      setMessage('Game session started successfully');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Game Sessions</h2>
      <button onClick={handleStartGame}>Start New Game</button>
      {message && <p>{message}</p>}
      <ul>
        {gameSessions.map((session) => (
          <li key={session._id}>
            Game Session ID: {session._id}, Created At: {new Date(session.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameSession;
