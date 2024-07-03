import React, { useEffect, useState } from 'react';
import { getGameSessions } from '../services/gameService';

function GameSessionHistory() {
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    const fetchGameSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getGameSessions({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGameSessions(data);
      } catch (error) {
        console.error('Error fetching game sessions:', error);
      }
    };

    fetchGameSessions();
  }, []);

  return (
    <div>
      <h2>Game Session History</h2>
      <ul>
        {gameSessions.map((session) => (
          <li key={session._id}>
            Game ID: {session._id}, State: {session.state}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameSessionHistory;
