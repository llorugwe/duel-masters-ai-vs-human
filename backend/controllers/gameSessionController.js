const GameSession = require('../models/GameSession');

// Create a new game session
exports.createGameSession = async (req, res) => {
  try {
    const gameSession = new GameSession({
      player: req.user.id,
      gameData: req.body.gameData,
    });

    const savedGameSession = await gameSession.save();
    res.status(201).json(savedGameSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all game sessions for a user
exports.getGameSessions = async (req, res) => {
  try {
    const gameSessions = await GameSession.find({ player: req.user.id });
    res.json(gameSessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
