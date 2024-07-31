import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [gameState, setGameState] = useState({
    board: [
      // Initial board state with terrain types
      // Example: [{ terrain: 'grass' }, { terrain: 'water' }, { terrain: 'desert' }, { terrain: 'mountain' }]
    ],
    playerPositions: {
      Player1: [0, 0],
      Player2: [0, 0],
      AI: [0, 0],
    },
    playerHealth: {
      Player1: 100,
      Player2: 100,
      AI: 100,
    },
  });

  const onPlayerMove = (player, rowIndex, colIndex, newHealth) => {
    // Create a copy of the game state to update it immutably
    const newGameState = { ...gameState };
    
    // Update the player's position and health in the game state
    newGameState.playerPositions[player] = [colIndex, rowIndex];
    newGameState.playerHealth[player] = newHealth;

    // Set the new game state
    setGameState(newGameState);

    // Additional logic to handle game state updates
    // For example, checking if the player has won or lost
  };

  return <Board gameState={gameState} onPlayerMove={onPlayerMove} />;
};

export default Game;
