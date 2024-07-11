const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  draws: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
