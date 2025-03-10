import React, { useState, useEffect } from 'react';
import Board from './Board';
import '../styles/Game.css';

function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0
  });
  
  const current = history[stepNumber];
  const winInfo = calculateWinner(current.squares);
  const winner = winInfo ? winInfo.winner : null;
  const winningLine = winInfo ? winInfo.line : null;
  
  // Check for a win or draw and update scores
  useEffect(() => {
    // Only check on the last move in history
    if (stepNumber === history.length - 1) {
      if (winner) {
        if (winner === 'X') {
          setScores(prev => ({ ...prev, xWins: prev.xWins + 1 }));
        } else {
          setScores(prev => ({ ...prev, oWins: prev.oWins + 1 }));
        }
      } else if (stepNumber === 9) {
        // It's a draw when all 9 squares are filled and no winner
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    }
  }, [winner, stepNumber, history.length]);
  
  const status = winner 
    ? `Winner: ${winner}` 
    : stepNumber === 9 
      ? 'Game ended in a draw!' 
      : `Next player: ${xIsNext ? 'X' : 'O'}`;
  
  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentCopy = historyCopy[historyCopy.length - 1];
    const squaresCopy = [...currentCopy.squares];
    
    // Return early if there is a winner or square is already filled
    if (winner || squaresCopy[i]) {
      return;
    }
    
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    
    setHistory([...historyCopy, { squares: squaresCopy }]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };
  
  const reset = () => {
    setHistory([{
      squares: Array(9).fill(null),
    }]);
    setStepNumber(0);
    setXIsNext(true);
  };
  
  const resetScores = () => {
    setScores({
      xWins: 0,
      oWins: 0,
      draws: 0
    });
  };

  return (
    <div className="game">
      <div className="game-info">
        <h1>Tic Tac Toe</h1>
        <div className={`status ${winner ? (winner === 'X' ? 'x-winner' : 'o-winner') : ''}`}>
          {status}
        </div>
        <button className="reset-button" onClick={reset}>
          New Game
        </button>
      </div>
      <div className="game-board">
        <Board 
          squares={current.squares} 
          onClick={handleClick}
          winningLine={winningLine}
          xIsNext={xIsNext}
        />
      </div>
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <div className="scores">
          <div className="score-item x-score">
            <span className="player">X&nbsp;Wins</span>
            <span className="score-value">{scores.xWins}</span>
          </div>
          <div className="score-item draw-score">
            <span className="player">Draws</span>
            <span className="score-value">{scores.draws}</span>
          </div>
          <div className="score-item o-score">
            <span className="player">O&nbsp;Wins</span>
            <span className="score-value">{scores.oWins}</span>
          </div>
        </div>
        <button className="reset-scores-button" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
}

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  
  return null;
}

export default Game; 