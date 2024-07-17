import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OpponentSelection.css';

const OpponentSelection = () => {
  const [player, setPlayer] = useState(localStorage.getItem('playerName') || '');
  const [opponent, setOpponent] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const startGame = () => {
    if (player && opponent) {
      localStorage.setItem('opponent', opponent); // Store selected opponent
      navigate('/game-interface'); // Redirect to game interface
    }
  };

  return (
    <div className="opponent-selection">
      <h2>Select Your Opponent</h2>
      <div className="form-group">
        <label>Player Name:</label>
        <input type="text" value={player} readOnly />
      </div>
      <div className="form-group">
        <label>Opponent:</label>
        <select value={opponent} onChange={(e) => setOpponent(e.target.value)}>
          <option value="">Select Opponent</option>
          <option value="AI">AI</option>
          <option value="Player2">Another Player</option>
        </select>
      </div>
      <button onClick={startGame} className="start-game-button">Start Game</button>
      <section className="leaderboard-section">
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>
              {player.name}: {player.points}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OpponentSelection;
