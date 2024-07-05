import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameSessions() {
  const [gameSessions, setGameSessions] = useState([]);
  const [error, setError] = useState('');

  const handleStartNewGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({
        sessionName: 'New Game Session',
        players: ['Player1', 'Player2'],
      });
      await axios.post('http://localhost:5000/api/game-sessions', body, config);
      fetchGameSessions(); // Fetch and display game sessions after creating a new one
    } catch (err) {
      setError(err.response.data.message || 'Error: Request failed with status code ' + err.response.status);
    }
  };

  const fetchGameSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const res = await axios.get('http://localhost:5000/api/game-sessions', config);
      setGameSessions(res.data);
    } catch (err) {
      setError(err.response.data.message || 'Error: Request failed with status code ' + err.response.status);
    }
  };

  useEffect(() => {
    fetchGameSessions();
  }, []);

  return (
    <div>
      <h2>Game Sessions</h2>
      <button onClick={handleStartNewGame}>Start New Game</button>
      {error && <p>{error}</p>}
      <ul>
        {gameSessions.map(session => (
          <li key={session._id}>{session.sessionName}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameSessions;
