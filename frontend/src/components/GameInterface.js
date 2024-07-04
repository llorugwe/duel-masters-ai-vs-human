import React, { useState } from 'react';
import { createGameSession } from '../services/gameService';

function GameInterface() {
  const [message, setMessage] = useState('');

  const handleStartGame = async () => {
    try {
      const data = await createGameSession({
        players: ['player1', 'player2'],
        state: 'ongoing',
        moves: [],
      });
      setMessage(data.message); // Ensure we are accessing the message property correctly
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message)); // Handle potential undefined error.response or error.response.data
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
