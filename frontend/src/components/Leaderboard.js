import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Leaderboard</h2>
      {message && <p>{message}</p>}
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.player}: {entry.wins} Wins, {entry.losses} Losses, {entry.draws} Draws
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
