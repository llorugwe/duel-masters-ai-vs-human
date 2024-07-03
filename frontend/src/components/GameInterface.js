import React, { useState } from 'react';
import { createGameSession } from '../services/gameService';

function GameInterface() {
  const [message, setMessage] = useState('');

  const handleStartGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await createGameSession({
        players: ['player1', 'player2'],
        state: 'ongoing',
        moves: [],
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Game Interface</h2>
      <button onClick={handleStartGame}>Start Game</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default GameInterface;
