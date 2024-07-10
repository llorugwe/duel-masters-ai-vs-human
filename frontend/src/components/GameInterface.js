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

  const handleCreateGameSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const response = await axios.post('http://localhost:5000/api/game-sessions', {
        sessionName: 'New Game',
        players: ['Player1', 'Player2', 'AI']
      }, config);
      setGameId(response.data._id);
      setGameState(response.data);
      console.log('Game session created:', response.data);
    } catch (error) {
      console.error('Error creating game session', error);
      setMessage('Failed to create game session. Please try again.');
    }
  };

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
      console.log('Move made:', response.data);
    } catch (err) {
      setMessage(err.response.data.message || 'Error: Request failed with status code ' + err.response.status);
      console.error('Error making move:', err);
    }
  };

  useEffect(() => {
    if (!gameId) {
      handleCreateGameSession();
    }
  }, []);

  return (
    <div className="game-interface">
      <header className="game-header">
        <h1>Duel Masters: AI vs Human</h1>
        <div className="player-info">
          <div>
            <label>Game ID:</label>
            <input type="text" value={gameId} readOnly />
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
        </div>
      </header>
      {message && <p className="message">{message}</p>}
      {gameState && (
        <>
          <section className="game-state">
            <h3>Game State</h3>
            <div className="state-info">
              <div><strong>Player Positions:</strong> {JSON.stringify(gameState.playerPositions)}</div>
              <div><strong>Player Health:</strong> {JSON.stringify(gameState.playerHealth)}</div>
              <div><strong>Moves:</strong> {JSON.stringify(gameState.moves)}</div>
            </div>
          </section>
          <Board gameState={gameState} />
        </>
      )}
    </div>
  );
}

export default GameInterface;
