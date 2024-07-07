const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { makeMove } = require('../controllers/aiController');

// Route to make a move with AI
router.post('/make-move', auth, makeMove);

module.exports = router;
