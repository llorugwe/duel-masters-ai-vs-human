const express = require('express');
const router = express.Router();
const { createGameSession, getGameSessions } = require('../controllers/gameSessionController');

// Create a new game session
router.post('/create', createGameSession);

// Get all game sessions
router.get('/', getGameSessions);

module.exports = router;
