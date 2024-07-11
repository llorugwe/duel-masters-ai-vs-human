import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChooseOpponent.css';

const ChooseOpponent = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [opponent, setOpponent] = useState('AI');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        console.error('Error fetching leaderboard', err);
      }
    };

    fetchLeaderboard();
  }, []);

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
      
      <h2>Leaderboard</h2>
      <ul className="leaderboard">
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <span>{entry.player}</span> - <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChooseOpponent;
