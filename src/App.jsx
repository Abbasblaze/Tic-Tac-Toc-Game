import { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Square = ({ value, onClick }) => {
  return (
    <button 
      className="w-24 h-24 bg-blue-100 border border-blue-400 text-3xl font-bold hover:bg-blue-300"
      onClick={onClick}
    >
      {value}
    </button>
  );
};


Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, 
};




const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null) && !winner;
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'It\'s a draw! Play again.'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-2xl">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>
      {(winner || isDraw) && (
        <button 
          className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          onClick={handleReset}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <Board />
    </div>
  );
};

export default App; 
