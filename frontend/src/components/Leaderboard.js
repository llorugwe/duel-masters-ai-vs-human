import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/leaderboardService';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getLeaderboard({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            {entry.player}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;