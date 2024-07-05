const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSessionSchema = new Schema({
  sessionName: {
    type: String,
    required: true
  },
  players: {
    type: [String],
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('gameSessions', GameSessionSchema);
