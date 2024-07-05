const GameSession = require('../models/GameSession');
const { validationResult } = require('express-validator');

// Function to handle game moves
const makeMove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { gameId, player, move } = req.body;

  try {
    const gameSession = await GameSession.findById(gameId);

    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    // Implement the game logic here
    // For example, you could update the game state based on the move

    gameSession.moves.push({ player, move });

    await gameSession.save();
    res.status(200).json(gameSession);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { makeMove };
