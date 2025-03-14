
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = (Player)[][];

const TicTacToeSolution: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  
  // Check for winner after each move
  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [board]);
  
  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    // If cell is already filled or game is over, do nothing
    if (board[row][col] || winner || isDraw) return;
    
    // Update the board
    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    
    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };
  
  // Check for winner
  const checkWinner = () => {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        setWinner(board[row][0]);
        return;
      }
    }
    
    // Check columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
        setWinner(board[0][col]);
        return;
      }
    }
    
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      setWinner(board[0][0]);
      return;
    }
    
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      setWinner(board[0][2]);
      return;
    }
  };
  
  // Check for draw
  const checkDraw = () => {
    if (winner) return;
    
    // If all cells are filled and no winner, it's a draw
    const isDraw = board.every(row => row.every(cell => cell !== null));
    setIsDraw(isDraw);
  };
  
  // Reset the game
  const resetGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };
  
  // Render cell with proper styling
  const renderCell = (row: number, col: number) => {
    const value = board[row][col];
    
    return (
      <button
        className={`h-16 w-16 flex items-center justify-center text-2xl font-bold border-2 border-primary/20 focus:outline-none transition-colors ${
          value ? 'cursor-not-allowed' : 'hover:bg-primary/5 cursor-pointer'
        }`}
        onClick={() => handleCellClick(row, col)}
        disabled={!!value || !!winner || isDraw}
      >
        {value === 'X' && <span className="text-blue-600">X</span>}
        {value === 'O' && <span className="text-red-600">O</span>}
      </button>
    );
  };
  
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <div className="mb-4">
        {winner ? (
          <div className="text-center animate-fade-in">
            <span className={`text-lg font-medium ${winner === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
              Player {winner} wins!
            </span>
          </div>
        ) : isDraw ? (
          <div className="text-center animate-fade-in">
            <span className="text-lg font-medium">It's a draw!</span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-lg font-medium">
              Current player: <span className={currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'}>{currentPlayer}</span>
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-1 border-2 border-primary/20 p-1 rounded-lg bg-white">
        {board.map((row, rowIndex) => (
          row.map((_, colIndex) => (
            <React.Fragment key={`${rowIndex}-${colIndex}`}>
              {renderCell(rowIndex, colIndex)}
            </React.Fragment>
          ))
        ))}
      </div>
      
      <button
        onClick={resetGame}
        className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <RefreshCw size={16} />
        <span>Reset Game</span>
      </button>
    </div>
  );
};

export default TicTacToeSolution;
