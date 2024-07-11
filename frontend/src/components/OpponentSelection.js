import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OpponentSelection.css';

const OpponentSelection = ({ history }) => {
  const [player, setPlayer] = useState('');
  const [opponent, setOpponent] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

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
      history.push('/game', { player, opponent });
    }
  };

  return (
    <div className="opponent-selection">
      <h2>Select Opponent</h2>
      <div className="form-group">
        <label>Player Name:</label>
        <input type="text" value={player} onChange={(e) => setPlayer(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Opponent:</label>
        <select value={opponent} onChange={(e) => setOpponent(e.target.value)}>
          <option value="">Select Opponent</option>
          <option value="AI">AI</option>
          <option value="Player2">Another Player</option>
        </select>
      </div>
      <button onClick={startGame}>Start Game</button>
      <section className="leaderboard-section">
        <h2>Leaderboard</h2>
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
