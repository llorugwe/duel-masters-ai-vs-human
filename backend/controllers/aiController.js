const GameSession = require('../models/GameSession');

// Evaluate the game state to decide the best move for AI
const evaluateGameState = (gameSession) => {
  // Example logic: count the number of moves
  return gameSession.moves.length;
};

// Get possible moves for the AI
const getPossibleMoves = (gameSession) => {
  return ['forward', 'backward', 'left', 'right'];
};

// Simplified minimax algorithm for AI decision-making
const minimax = (gameSession, depth, isMaximizingPlayer) => {
  const score = evaluateGameState(gameSession);
  
  if (depth === 0 || gameSession.isGameOver()) {
    return score;
  }

  const possibleMoves = getPossibleMoves(gameSession);

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of possibleMoves) {
      gameSession.moves.push({ player: 'AI', move });
      const eval = minimax(gameSession, depth - 1, false);
      gameSession.moves.pop();
      maxEval = Math.max(maxEval, eval);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of possibleMoves) {
      gameSession.moves.push({ player: 'Player', move });
      const eval = minimax(gameSession, depth - 1, true);
      gameSession.moves.pop();
      minEval = Math.min(minEval, eval);
    }
    return minEval;
  }
};

// Advanced AI move logic
const makeAIMove = (gameSession) => {
  const possibleMoves = getPossibleMoves(gameSession);
  let bestMove;
  let bestValue = -Infinity;

  for (const move of possibleMoves) {
    gameSession.moves.push({ player: 'AI', move });
    const moveValue = minimax(gameSession, 3, false);
    gameSession.moves.pop();

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }

  return bestMove || 'forward';
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
