const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    state: { type: String, required: true },
    moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }],
    createdAt: { type: Date, default: Date.now }
});

const GameSession = mongoose.model('GameSession', GameSessionSchema);
module.exports = GameSession;
