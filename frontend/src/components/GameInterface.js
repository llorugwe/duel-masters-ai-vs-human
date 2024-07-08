import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import './GameInterface.css';

function GameInterface() {
  const [gameId, setGameId] = useState('');
  const [player, setPlayer] = useState('');
  const [move, setMove] = useState('');
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState(null);

  const handleMove = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ gameId, player, move });
      const response = await axios.post('http://localhost:5000/api/game-sessions/make-move', body, config);
      setMessage('Move made successfully');
      setGameState(response.data.gameSession);
    } catch (err) {
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
      {gameState && (
        <>
          <h3>Game State</h3>
          <div>Player Positions: {JSON.stringify(Object.fromEntries(gameState.playerPositions))}</div>
          <div>Player Health: {JSON.stringify(Object.fromEntries(gameState.playerHealth))}</div>
          <div>Moves: {JSON.stringify(gameState.moves)}</div>
          <Board gameState={gameState} />
        </>
      )}
    </div>
  );
}

export default GameInterface;
