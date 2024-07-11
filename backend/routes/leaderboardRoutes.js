const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ wins: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
