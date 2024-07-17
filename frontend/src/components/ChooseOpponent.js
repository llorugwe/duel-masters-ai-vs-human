import React, { useState } from 'react';
import './ChooseOpponent.css';
import Leaderboard from './Leaderboard';

const ChooseOpponent = () => {
  const [opponent, setOpponent] = useState('AI');

  const handleStartGame = () => {
    const players = ['Player1'];
    if (opponent === 'AI') {
      players.push('AI');
    } else {
      players.push('Player2');
    }
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('opponent', opponent); // Store the opponent in localStorage
    // Redirect to game interface
    window.location.href = '/game-interface';
  };

  return (
    <div className="choose-opponent-container">
      <h2>Choose Your Opponent</h2>
      <div className="opponent-selection">
        <button onClick={() => setOpponent('AI')} className={opponent === 'AI' ? 'selected' : ''}>AI</button>
        <button onClick={() => setOpponent('Human')} className={opponent === 'Human' ? 'selected' : ''}>Human</button>
      </div>
      <button onClick={handleStartGame} className="start-game-btn">Start Game</button>
      <Leaderboard />
    </div>
  );
};

export default ChooseOpponent;
