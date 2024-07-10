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
    of: [Number], // Storing arrays of numbers
    required: true,
  },
  playerHealth: {
    type: Map,
    of: Number,
    required: true,
  },
  board: {
    type: [[{ terrain: String }]], // Change to array of arrays of objects with terrain property
    required: true,
  },
  moves: {
    type: [{ player: String, move: String }],
    default: [],
  },
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
