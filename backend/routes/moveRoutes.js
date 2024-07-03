const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { createMove, getMoves } = require('../controllers/moveController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new move
router.post(
  '/create',
  authMiddleware,
  [
    check('gameSession', 'Game session is required').not().isEmpty(),
    check('player', 'Player is required').not().isEmpty(),
    check('move', 'Move is required').not().isEmpty()
  ],
  createMove
);

// Get moves for a game session
router.get('/:gameSessionId', authMiddleware, getMoves);

module.exports = router;