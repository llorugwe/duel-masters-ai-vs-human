const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true
  },
  players: [
    {
      type: String,
      required: true
    }
  ],
  moves: [
    {
      player: {
        type: String,
        required: true
      },
      move: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
