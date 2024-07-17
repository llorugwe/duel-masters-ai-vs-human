import React from 'react';
import './Board.css';
import player1Icon from './icons/player1.png';
import player2Icon from './icons/player2.png';
import aiIcon from './icons/ai.png';

const Board = ({ gameState }) => {
  const { board, playerPositions, playerHealth } = gameState;

  // Create a map to track the positions of the players
  const playerPositionMap = new Map();
  Object.entries(playerPositions).forEach(([player, [x, y]]) => {
    playerPositionMap.set(`${x}-${y}`, player);
  });

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const player = playerPositionMap.get(`${colIndex}-${rowIndex}`);
            return (
              <div key={colIndex} className={`board-cell ${cell.terrain}`}>
                {player && (
                  <span
                    className="player-icon"
                    style={{
                      backgroundImage: `url(${
                        player === 'Player1'
                          ? player1Icon
                          : player === 'Player2'
                          ? player2Icon
                          : aiIcon
                      })`
                    }}
                  >
                    <span className="player-health">
                      {playerHealth[player]}%
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
