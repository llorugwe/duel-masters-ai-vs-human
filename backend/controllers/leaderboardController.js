const { validationResult } = require('express-validator');
const Leaderboard = require('../models/Leaderboard');

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getLeaderboard };
