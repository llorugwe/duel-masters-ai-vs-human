const GameSession = require('../models/GameSession');

// Create a new game session
const createGameSession = async (req, res) => {
  const { players, state, moves } = req.body;

  try {
    const newGameSession = new GameSession({
      players,
      state,
      moves,
    });

    await newGameSession.save();
    res.status(201).json({ message: 'Game session created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all game sessions
const getGameSessions = async (req, res) => {
  try {
    const gameSessions = await GameSession.find();
    res.status(200).json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createGameSession, getGameSessions };
