const Leaderboard = require('../models/Leaderboard');

// Function to update leaderboard
const updateLeaderboard = async (player, result) => {
  let leaderboardEntry = await Leaderboard.findOne({ player });

  if (!leaderboardEntry) {
    leaderboardEntry = new Leaderboard({ player });
  }

  if (result === 'win') {
    leaderboardEntry.wins += 1;
  } else if (result === 'loss') {
    leaderboardEntry.losses += 1;
  } else if (result === 'draw') {
    leaderboardEntry.draws += 1;
  }

  await leaderboardEntry.save();
};

// Example of updating leaderboard after a game
const makeMove = async (req, res) => {
  const { gameId, player, move, result } = req.body;

  try {
    const gameSession = await GameSession.findById(gameId);
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    gameSession.moves.push({ player, move });
    await gameSession.save();

    // Update leaderboard based on the result
    if (result) {
      await updateLeaderboard(player, result);
    }

    res.status(200).json({ message: 'Move made successfully', gameSession });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGameSession,
  getGameSessions,
  makeMove
};
