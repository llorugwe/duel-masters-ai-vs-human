const GameSession = require('../models/GameSession');
const { validationResult } = require('express-validator');

// Create a new game session
const createGameSession = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { sessionName, players } = req.body;

  try {
    const newGameSession = new GameSession({
      sessionName,
      players,
    });

    await newGameSession.save();
    res.status(201).json(newGameSession);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all game sessions
const getGameSessions = async (req, res) => {
  try {
    const gameSessions = await GameSession.find();
    res.status(200).json(gameSessions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Make a move in a game session
const makeMove = async (req, res) => {
  const { gameId, player, move, result } = req.body;

  try {
    // Find the game session by ID
    const gameSession = await GameSession.findById(gameId);
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    // Add the move to the game session
    gameSession.moves.push({ player, move, result });
    await gameSession.save();

    res.status(200).json({ message: 'Move made successfully', gameSession });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGameSession,
  getGameSessions,
  makeMove,
};
