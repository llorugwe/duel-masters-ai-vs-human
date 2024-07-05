const express = require('express');
const router = express.Router();
const { createGameSession, getGameSessions } = require('../controllers/gameSessionController');
const auth = require('../middleware/auth');

router.post('/', auth, createGameSession);
router.get('/', auth, getGameSessions);

module.exports = router;

