import React from 'react';
import '../styles/Square.css';

function Square({ value, onClick, isWinningSquare, isX }) {
  let squareClass = 'square';
  
  if (isWinningSquare) {
    squareClass += ' winning';
  }
  
  if (value) {
    squareClass += value === 'X' ? ' x-square' : ' o-square';
  }
  
  return (
    <button 
      className={squareClass} 
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square; 