import React, { useState } from 'react';
import axios from 'axios';

function GameInterface() {
  const [gameId, setGameId] = useState('');
  const [player, setPlayer] = useState('');
  const [move, setMove] = useState('');
  const [message, setMessage] = useState('');

  const handleMove = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found, please login again.');
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ gameId, player, move });
      await axios.post('http://localhost:5000/api/game-sessions/make-move', body, config);
      setMessage('Move made successfully');
    } catch (err) {
      console.error(err);
      setMessage(err.response.data.message || 'Error: Request failed with status code ' + err.response.status);
    }
  };

  return (
    <div>
      <h2>Game Interface</h2>
      <div>
        <label>Game ID:</label>
        <input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} />
      </div>
      <div>
        <label>Player:</label>
        <input type="text" value={player} onChange={(e) => setPlayer(e.target.value)} />
      </div>
      <div>
        <label>Move:</label>
        <input type="text" value={move} onChange={(e) => setMove(e.target.value)} />
      </div>
      <button onClick={handleMove}>Make Move</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default GameInterface;
