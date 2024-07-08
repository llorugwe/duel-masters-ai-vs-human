const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSessionSchema = new Schema({
  sessionName: {
    type: String,
    required: true,
  },
  players: {
    type: [String],
    required: true,
  },
  playerPositions: {
    type: Map,
    of: [Number], // Change this line to store arrays of numbers
    required: true,
  },
  playerHealth: {
    type: Map,
    of: Number,
    required: true,
  },
  board: {
    type: [[String]], // Array of arrays of strings (for the board)
    required: true,
  },
  moves: {
    type: [{ player: String, move: String }],
    default: [],
  },
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
