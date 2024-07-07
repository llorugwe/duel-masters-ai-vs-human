const GameSession = require('../models/GameSession');
const { validationResult } = require('express-validator');

// Create a new game session
const createGameSession = async (req, res) => {
  console.log("createGameSession called");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { sessionName, players } = req.body;
  console.log("Session Name:", sessionName);
  console.log("Players:", players);

  try {
    const newGameSession = new GameSession({
      sessionName,
      players,
    });

    await newGameSession.save();
    console.log("New game session created:", newGameSession);
    res.status(201).json(newGameSession);
  } catch (error) {
    console.error("Error creating game session:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all game sessions
const getGameSessions = async (req, res) => {
  console.log("getGameSessions called");
  try {
    const gameSessions = await GameSession.find();
    console.log("Retrieved game sessions:", gameSessions);
    res.status(200).json(gameSessions);
  } catch (error) {
    console.error("Error getting game sessions:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Make a move in a game session
const makeMove = async (req, res) => {
  console.log("makeMove called");
  const { gameId, player, move } = req.body;
  console.log("Game ID:", gameId);
  console.log("Player:", player);
  console.log("Move:", move);

  try {
    // Find the game session by ID
    const gameSession = await GameSession.findById(gameId);
    if (!gameSession) {
      console.log("Game session not found:", gameId);
      return res.status(404).json({ message: 'Game session not found' });
    }

    // Add the move to the game session
    gameSession.moves.push({ player, move });
    await gameSession.save();
    console.log("Move made successfully:", gameSession);
    res.status(200).json({ message: 'Move made successfully', gameSession });
  } catch (err) {
    console.error("Error making move:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGameSession,
  getGameSessions,
  makeMove, // Export the makeMove function
};
