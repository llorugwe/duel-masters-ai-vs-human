const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { createGameSession, getGameSessions } = require('../controllers/gameSessionController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new game session
router.post(
  '/create',
  authMiddleware,
  [
    check('players', 'Players are required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('moves', 'Moves are required').isArray()
  ],
  createGameSession
);

// Get all game sessions
router.get('/', authMiddleware, getGameSessions);

module.exports = router;

