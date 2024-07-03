const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
    gameSession: { type: mongoose.Schema.Types.ObjectId, ref: 'GameSession', required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    move: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Move = mongoose.model('Move', MoveSchema);
module.exports = Move;
