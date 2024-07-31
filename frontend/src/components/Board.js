import React from 'react';
import './Board.css';
import player1Icon from './icons/player1.png';
import player2Icon from './icons/player2.png';
import aiIcon from './icons/ai.png';

const Board = ({ gameState, onPlayerMove }) => {
  const { board, playerPositions, playerHealth } = gameState;

  console.log('Game State:', gameState);
  console.log('Player Positions:', playerPositions);

  // Handle the logic when a cell is clicked or a player lands on a cell
  const handleCellClick = (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    const player = Object.keys(playerPositions).find(
      key => playerPositions[key][0] === colIndex && playerPositions[key][1] === rowIndex
    );

    if (!player) return;

    // Handle different terrain effects
    switch (cell.terrain) {
      case 'grass':
        // No special effect
        break;
      case 'water':
        // Player loses health
        playerHealth[player] = Math.max(playerHealth[player] - 10, 0);
        break;
      case 'desert':
        // Player's speed is reduced (example)
        console.log(`${player} is slowed down in the desert`);
        break;
      case 'mountain':
        // Player cannot move further (example)
        console.log(`${player} cannot move further in the mountains`);
        break;
      default:
        break;
    }

    // Update the game state with the new player position and health
    onPlayerMove(player, rowIndex, colIndex, playerHealth[player]);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const isPlayerHere = Object.entries(playerPositions).find(
              ([player, [x, y]]) => x === colIndex && y === rowIndex
            );
            return (
              <div
                key={colIndex}
                className={`board-cell ${cell.terrain}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {isPlayerHere && (
                  <span
                    className="player-icon"
                    style={{
                      backgroundImage: `url(${
                        isPlayerHere[0] === 'Player1'
                          ? player1Icon
                          : isPlayerHere[0] === 'Player2'
                          ? player2Icon
                          : aiIcon
                      })`
                    }}
                  >
                    <span className="player-health">
                      {gameState.playerHealth[isPlayerHere[0]]}%
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
