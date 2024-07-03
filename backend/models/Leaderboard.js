const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);
module.exports = Leaderboard;
