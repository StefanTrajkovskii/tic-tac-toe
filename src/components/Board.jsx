import React from 'react';
import Square from './Square';
import '../styles/Board.css';

function Board({ squares, onClick, winningLine, xIsNext }) {
  const renderSquare = (i) => {
    const isWinningSquare = winningLine && winningLine.includes(i);
    const value = squares[i];
    
    return (
      <Square 
        key={i}
        value={value} 
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
        isX={value === 'X'}
      />
    );
  };

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      squaresInRow.push(renderSquare(index));
    }
    boardRows.push(
      <div className="board-row" key={row}>
        {squaresInRow}
      </div>
    );
  }

  return (
    <div className={`board ${xIsNext ? 'x-turn' : 'o-turn'}`}>
      {boardRows}
    </div>
  );
}

export default Board; 