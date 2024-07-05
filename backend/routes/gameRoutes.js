const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { makeMove } = require('../controllers/gameController');

const router = express.Router();

// Route to handle game moves
router.post(
  '/make-move',
  [
    auth,
    [
      check('gameId', 'Game ID is required').not().isEmpty(),
      check('player', 'Player is required').not().isEmpty(),
      check('move', 'Move is required').not().isEmpty(),
    ],
  ],
  makeMove
);

module.exports = router;
