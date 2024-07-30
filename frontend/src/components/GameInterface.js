import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Board from './Board';
import './GameInterface.css';
import playerIcon from './icons/player.png';
import aiIcon from './icons/ai.png';

function GameInterface() {
  const [gameId, setGameId] = useState('');
  const [player] = useState(localStorage.getItem('playerName') || '');
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState({ 
    board: [], 
    playerPositions: {}, // Initial positions are set dynamically
    playerHealth: {} 
  });
  const opponent = localStorage.getItem('opponent') || 'AI';

  const handleCreateGameSession = useCallback(async () => {
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
        players: [player, opponent]
      }, config);
      console.log('Game session created:', response.data);
      setGameId(response.data._id);
      setGameState({
        ...response.data,
        playerPositions: {
          Player1: [0, 0], // Ensure initial position for Player1
          ...(opponent === 'AI' ? { AI: [4, 4] } : { Player2: [9, 9] }) // Conditional position for AI or Player2
        },
        playerHealth: {
          Player1: 100,
          ...(opponent === 'AI' ? { AI: 100 } : { Player2: 100 })
        }
      });
    } catch (error) {
      console.error('Error creating game session', error);
      setMessage('Failed to create game session. Please try again.');
    }
  }, [player, opponent]);

  const handleMove = async (selectedMove) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = JSON.stringify({ gameId, player, move: selectedMove });
      const response = await axios.post('http://localhost:5000/api/game-sessions/make-move', body, config);
      setMessage('Move made successfully');
      console.log('Move response data:', response.data);
      setGameState(response.data.gameSession);
    } catch (err) {
      setMessage(err.response.data.message || 'Error: Request failed with status code ' + err.response.status);
      console.error('Error making move:', err);
    }
  };

  useEffect(() => {
    if (!gameId) {
      handleCreateGameSession();
    }
  }, [gameId, handleCreateGameSession]);

  useEffect(() => {
    console.log('Initial Game State:', gameState);
  }, [gameState]);

  return (
    <div className="game-interface">
      <header className="game-header">
        <h1>Duel Masters: AI vs Human</h1>
        <div className="player-info">
          <div className="info-item">
            <img src={playerIcon} alt="Player Icon" className="player-icon" />
            <label>Game ID:</label>
            <input type="text" value={gameId} readOnly />
          </div>
          <div className="info-item">
            <img src={playerIcon} alt="Player Icon" className="player-icon" />
            <label>Player:</label>
            <input type="text" value={player} readOnly />
          </div>
        </div>
      </header>
      {message && <p className="message">{message}</p>}
      {gameState && (
        <div className="game-container">
          <Board gameState={gameState} />
          <div className="move-controls">
            <div className="move-buttons">
              <button className="move-button" onClick={() => handleMove('up')}>Up</button>
              <div className="horizontal-buttons">
                <button className="move-button" onClick={() => handleMove('left')}>Left</button>
                <button className="move-button" onClick={() => handleMove('right')}>Right</button>
              </div>
              <button className="move-button" onClick={() => handleMove('down')}>Down</button>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleMove('attack')}>Attack</button>
              <button onClick={() => handleMove('defend')}>Defend</button>
              <button onClick={() => handleMove('special move')}>Special Move</button>
            </div>
          </div>
        </div>
      )}
      {gameState && (
        <section className="game-state">
          <h3>Game State</h3>
          <div className="state-info">
            <div className="health-info">
              <div>
                <img src={playerIcon} alt="Player Icon" className="health-icon" />
                <strong>Player1 Health:</strong> {gameState.playerHealth['Player1']}%
              </div>
              {opponent !== 'AI' && (
                <div>
                  <img src={playerIcon} alt="Player Icon" className="health-icon" />
                  <strong>Player2 Health:</strong> {gameState.playerHealth['Player2']}%
                </div>
              )}
              {opponent === 'AI' && (
                <div>
                  <img src={aiIcon} alt="AI Icon" className="health-icon" />
                  <strong>AI Health:</strong> {gameState.playerHealth['AI']}%
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default GameInterface;
