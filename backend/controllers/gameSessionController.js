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

// AI Logic for making a move
const aiMakeMove = (currentMove) => {
  // Implement AI strategy here. For simplicity, we will make the AI always respond with "AI move".
  // In a real game, this function should analyze the currentMove and decide the best move.
  const possibleMoves = ['move1', 'move2', 'move3']; // Example moves
  const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  return `AI responded to move: ${randomMove}`;
};

// Make a move in a game session
const makeMove = async (req, res) => {
  const { gameId, player, move } = req.body;

  try {
    // Find the game session by ID
    const gameSession = await GameSession.findById(gameId);
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    // Add the move to the game session
    gameSession.moves.push({ player, move });

    // AI makes a move in response
    const aiResponse = aiMakeMove(move);
    gameSession.moves.push({ player: 'AI', move: aiResponse });

    await gameSession.save();

    res.status(200).json({ message: 'Move made successfully', gameSession, aiResponse });
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
