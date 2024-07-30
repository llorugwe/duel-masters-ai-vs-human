import React from 'react';
import './Board.css';
import player1Icon from './icons/player1.png';
import player2Icon from './icons/player2.png';
import aiIcon from './icons/ai.png';

const Board = ({ gameState }) => {
  const { board, playerPositions } = gameState;

  console.log('Game State:', gameState);
  console.log('Player Positions:', playerPositions);

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
