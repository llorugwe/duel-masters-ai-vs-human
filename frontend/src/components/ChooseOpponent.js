import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChooseOpponent.css';
import Leaderboard from './Leaderboard';

const ChooseOpponent = () => {
  const [opponent, setOpponent] = useState('AI');

  const handleStartGame = () => {
    localStorage.setItem('opponent', opponent);
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
