const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const gameSessionController = require('../controllers/gameSessionController');
// const auth = require('../middleware/auth'); // Comment out this line

// @route    POST api/game-sessions
// @desc     Create a game session
// @access   Private
router.post(
  '/',
  // [auth, [check('sessionName', 'Session name is required').not().isEmpty()]],
  [[check('sessionName', 'Session name is required').not().isEmpty()]], // Modified line
  gameSessionController.createGameSession
);

// @route    POST api/game-sessions/make-move
// @desc     Make a move in a game session
// @access   Private
router.post(
  '/make-move',
  // auth,
  gameSessionController.makeMove
);

module.exports = router;

