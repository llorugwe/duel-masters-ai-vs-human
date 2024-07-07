const GameSession = require('../models/GameSession');

// Simple AI logic
const makeAIMove = (gameSession) => {
  // Example AI move logic: move 'forward' if player move was 'backward', else move 'backward'
  const lastMove = gameSession.moves[gameSession.moves.length - 1];
  const aiMove = lastMove.move === 'backward' ? 'forward' : 'backward';
  return aiMove;
};

const makeMove = async (req, res) => {
  const { gameId, player, move } = req.body;

  try {
    const gameSession = await GameSession.findById(gameId);
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    gameSession.moves.push({ player, move });

    const aiMove = makeAIMove(gameSession);
    gameSession.moves.push({ player: 'AI', move: aiMove });

    await gameSession.save();

    res.status(200).json({ message: 'Move made successfully', gameSession });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  makeMove,
};
