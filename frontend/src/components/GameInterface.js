import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import './GameInterface.css';
import player1Icon from './icons/player1.png';
import player2Icon from './icons/player2.png';
import aiIcon from './icons/ai.png';

function GameInterface() {
  const [gameId, setGameId] = useState('');
  const [player, setPlayer] = useState(localStorage.getItem('playerName') || '');
  const [move, setMove] = useState('');
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState(null);
  const opponent = localStorage.getItem('opponent') || 'AI'; // Get the opponent from localStorage

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
        players: ['Player1', opponent]
      }, config);
      setGameId(response.data._id);
      setGameState(response.data);
      console.log('Game session created:', response.data);
    } catch (error) {
      console.error('Error creating game session', error);
      setMessage('Failed to create game session. Please try again.');
    }
  };

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
          <div className="info-item">
            <img src={player1Icon} alt="Player Icon" className="player-icon" />
            <label>Game ID:</label>
            <input type="text" value={gameId} readOnly />
          </div>
          <div className="info-item">
            <img src={player1Icon} alt="Player Icon" className="player-icon" />
            <label>Player:</label>
            <input type="text" value={player} readOnly />
          </div>
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
      </header>
      {message && <p className="message">{message}</p>}
      {gameState && (
        <>
          <section className="game-state">
            <h3>Game State</h3>
            <div className="state-info">
              <div className="health-info">
                <div>
                  <img src={player1Icon} alt="Player Icon" className="health-icon" />
                  <strong>Player1 Health:</strong> {gameState.playerHealth['Player1']}%
                </div>
                <div>
                  <img src={opponent === 'AI' ? aiIcon : player2Icon} alt="Opponent Icon" className="health-icon" />
                  <strong>{opponent} Health:</strong> {gameState.playerHealth[opponent]}%
                </div>
              </div>
              <div><strong>Player Positions:</strong> {JSON.stringify(gameState.playerPositions)}</div>
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
