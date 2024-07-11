import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // Ensure you have this CSS file for styling

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        setMessage('Error fetching leaderboard');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {message && <p>{message}</p>}
      <ul className="leaderboard-list">
        {leaderboard.map((entry, index) => (
          <li key={index} className="leaderboard-item">
            <span className="leaderboard-player">{entry.player}</span>
            <span className="leaderboard-stats">
              {entry.wins} Wins, {entry.losses} Losses, {entry.draws} Draws
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
