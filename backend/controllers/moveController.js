const { validationResult } = require('express-validator');
const Move = require('../models/Move');

// Create a new move
const createMove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { gameSession, player, move } = req.body;

  try {
    const newMove = new Move({
      gameSession,
      player,
      move,
    });

    await newMove.save();
    res.status(201).json({ message: 'Move created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get moves for a game session
const getMoves = async (req, res) => {
  try {
    const moves = await Move.find({ gameSession: req.params.gameSessionId });
    res.status(200).json(moves);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createMove, getMoves };