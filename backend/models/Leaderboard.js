const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  draws: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
