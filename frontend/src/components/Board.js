import React from 'react';
import './Board.css';

const Board = ({ gameState }) => {
  const { playerPositions, playerHealth } = gameState;

  const renderCell = (x, y) => {
    const playersAtCell = Object.entries(playerPositions).filter(
      ([player, pos]) => pos[0] === x && pos[1] === y
    );

    return (
      <div className="cell">
        {playersAtCell.map(([player]) => (
          <div key={player} className="player" style={{ backgroundColor: player === 'AI' ? 'red' : 'blue' }}>
            {player} <span className="health">({playerHealth[player]})</span>
          </div>
        ))}
      </div>
    );
  };

  const renderRow = (x) => (
    <div className="row" key={x}>
      {Array.from({ length: 10 }).map((_, y) => renderCell(x, y))}
    </div>
  );

  return (
    <div className="board">
      {Array.from({ length: 10 }).map((_, x) => renderRow(x))}
    </div>
  );
};

export default Board;
