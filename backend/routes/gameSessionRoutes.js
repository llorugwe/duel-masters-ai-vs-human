const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createGameSession, getGameSessions, makeMove } = require('../controllers/gameSessionController');

// Route to create a new game session
router.post('/', auth, createGameSession);

// Route to get all game sessions
router.get('/', auth, getGameSessions);

// Route to make a move
router.post('/make-move', auth, makeMove);

module.exports = router;


