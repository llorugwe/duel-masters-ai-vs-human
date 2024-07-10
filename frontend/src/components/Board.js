import React from 'react';
import './Board.css';

const Board = ({ gameState }) => {
  const { board, playerPositions } = gameState;

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const isPlayerHere = Object.entries(playerPositions).find(
              ([player, [x, y]]) => x === colIndex && y === rowIndex
            );
            return (
              <div key={colIndex} className={`board-cell ${cell.terrain}`}>
                {isPlayerHere && (
                  <span className="player" style={{ backgroundColor: isPlayerHere[0] === 'Player1' ? 'yellow' : 'red' }}>
                    {isPlayerHere[0]} ({gameState.playerHealth[isPlayerHere[0]]})
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
