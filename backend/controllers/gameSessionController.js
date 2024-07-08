const GameSession = require('../models/GameSession');
const { validationResult } = require('express-validator');

// Function to handle player move and update game state
const handlePlayerMove = (gameSession, player, move) => {
  const playerPositions = gameSession.playerPositions;
  const playerHealth = gameSession.playerHealth;
  const board = gameSession.board;

  const currentPosition = playerPositions.get(player) || [0, 0];
  let newPosition = [...currentPosition];

  switch (move) {
    case 'up':
      newPosition[1] = Math.max(0, newPosition[1] - 1);
      break;
    case 'down':
      newPosition[1] = Math.min(board.length - 1, newPosition[1] + 1);
      break;
    case 'left':
      newPosition[0] = Math.max(0, newPosition[0] - 1);
      break;
    case 'right':
      newPosition[0] = Math.min(board[0].length - 1, newPosition[0] + 1);
      break;
    case 'attack':
      const opponent = gameSession.players.find(p => p !== player);
      if (opponent) {
        playerHealth[opponent] = (playerHealth[opponent] || 100) - 10;
      }
      break;
    case 'defend':
      playerHealth[player] = (playerHealth[player] || 100) + 5;
      break;
    case 'special move':
      newPosition[1] = Math.min(board.length - 1, newPosition[1] + 2);
      break;
    default:
      break;
  }

  playerPositions.set(player, newPosition);
  gameSession.playerPositions = playerPositions;
  gameSession.playerHealth = playerHealth;
};

// Function to handle AI move and update game state
const aiMakeMove = (gameSession) => {
  const possibleMoves = ['up', 'down', 'left', 'right', 'attack', 'defend', 'special move'];
  const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  const aiPlayer = 'AI';
  handlePlayerMove(gameSession, aiPlayer, randomMove);

  return `AI responded to move: ${randomMove}`;
};

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
      playerPositions: new Map(players.map(player => [player, [0, 0]])),
      playerHealth: new Map(players.map(player => [player, 100])),
      board: Array(10).fill().map(() => Array(10).fill(null)) // Changed board size to 10x10
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
  const { gameId, player, move } = req.body;

  try {
    const gameSession = await GameSession.findById(gameId);
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    handlePlayerMove(gameSession, player, move);
    gameSession.moves.push({ player, move });

    const aiResponse = aiMakeMove(gameSession);
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
