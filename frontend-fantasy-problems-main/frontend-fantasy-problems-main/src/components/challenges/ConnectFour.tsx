
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type Player = 'red' | 'yellow';
type Cell = Player | null;
type Board = Cell[][];

const ROWS = 6;
const COLS = 7;
const WINNING_LENGTH = 4;

const createEmptyBoard = (): Board => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

const ConnectFour: React.FC = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('red');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const { toast } = useToast();

  // Reset game
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('red');
    setWinner(null);
  };

  // Check if the board is full (draw)
  const isBoardFull = (board: Board): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  };

  // Check if a player has won
  const checkWinner = (board: Board, row: number, col: number, player: Player): boolean => {
    // Check horizontal
    const checkDirection = (rowDir: number, colDir: number): boolean => {
      let count = 1; // Start with 1 for the current piece
      
      // Check in one direction
      for (let i = 1; i < WINNING_LENGTH; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;
        
        if (
          newRow >= 0 && newRow < ROWS && 
          newCol >= 0 && newCol < COLS && 
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      
      // Check in the opposite direction
      for (let i = 1; i < WINNING_LENGTH; i++) {
        const newRow = row - i * rowDir;
        const newCol = col - i * colDir;
        
        if (
          newRow >= 0 && newRow < ROWS && 
          newCol >= 0 && newCol < COLS && 
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      
      return count >= WINNING_LENGTH;
    };

    // Check in all directions
    return (
      checkDirection(0, 1) || // horizontal
      checkDirection(1, 0) || // vertical
      checkDirection(1, 1) || // diagonal /
      checkDirection(1, -1)   // diagonal \
    );
  };

  // Drop piece in column
  const dropPiece = (col: number, isAiMove = false) => {
    if (winner || aiThinking) return;
    
    // Find the lowest empty row in the column
    const newBoard = [...board.map(row => [...row])];
    let rowToPlace = -1;
    
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        rowToPlace = row;
        break;
      }
    }
    
    // If column is full, do nothing
    if (rowToPlace === -1) {
      if (!isAiMove) {
        toast({
          title: "Column is full",
          description: "Please select another column",
          variant: "destructive",
        });
      }
      return false;
    }
    
    // Place the piece
    newBoard[rowToPlace][col] = currentPlayer;
    setBoard(newBoard);
    
    // Check for winner
    if (checkWinner(newBoard, rowToPlace, col, currentPlayer)) {
      setWinner(currentPlayer);
      toast({
        title: `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`,
        variant: "default",
      });
      return true;
    }
    
    // Check for draw
    if (isBoardFull(newBoard)) {
      setWinner('draw');
      toast({
        title: "It's a draw!",
        description: "The board is full",
        variant: "default",
      });
      return true;
    }
    
    // Switch player
    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    return true;
  };

  // AI move (simple implementation)
  useEffect(() => {
    if (currentPlayer === 'yellow' && !winner) {
      setAiThinking(true);
      
      // Delay AI move to make it feel more natural
      const timer = setTimeout(() => {
        // Simple AI strategy: first try to win, then try to block, otherwise random
        
        // Try each column
        for (let col = 0; col < COLS; col++) {
          // Clone the board
          const testBoard = [...board.map(row => [...row])];
          
          // Find the lowest empty row in the column
          let rowToPlace = -1;
          for (let row = ROWS - 1; row >= 0; row--) {
            if (testBoard[row][col] === null) {
              rowToPlace = row;
              break;
            }
          }
          
          if (rowToPlace !== -1) {
            // Try placing AI's piece to see if it wins
            testBoard[rowToPlace][col] = 'yellow';
            if (checkWinner(testBoard, rowToPlace, col, 'yellow')) {
              dropPiece(col, true);
              setAiThinking(false);
              return;
            }
            
            // Try placing player's piece to see if it needs to be blocked
            testBoard[rowToPlace][col] = 'red';
            if (checkWinner(testBoard, rowToPlace, col, 'red')) {
              dropPiece(col, true);
              setAiThinking(false);
              return;
            }
          }
        }
        
        // If no winning or blocking move, choose a random column
        let randomCol;
        let moveMade = false;
        
        // Try up to 10 times to find a valid move
        for (let i = 0; i < 10; i++) {
          randomCol = Math.floor(Math.random() * COLS);
          if (dropPiece(randomCol, true)) {
            moveMade = true;
            break;
          }
        }
        
        // If still no move made, try each column sequentially
        if (!moveMade) {
          for (let col = 0; col < COLS; col++) {
            if (dropPiece(col, true)) break;
          }
        }
        
        setAiThinking(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Connect Four</h2>
      <p className="mb-4 text-muted-foreground">
        Play against AI. Drop pieces by clicking on a column. Get four in a row to win!
      </p>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-medium">Current player: </span>
          <span className={`inline-block h-5 w-5 rounded-full ${currentPlayer === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
          <span className="ml-2">{currentPlayer === 'red' ? 'You' : 'AI'}</span>
        </div>
        <Button onClick={resetGame} variant="outline">New Game</Button>
      </div>
      
      {winner && (
        <div className={`p-3 mb-4 rounded-md ${winner === 'draw' ? 'bg-slate-100' : winner === 'red' ? 'bg-red-100' : 'bg-yellow-100'}`}>
          {winner === 'draw' 
            ? "It's a draw!" 
            : `${winner === 'red' ? 'You' : 'AI'} wins!`}
        </div>
      )}
      
      <div className="relative border-2 border-blue-800 bg-blue-600 rounded-md p-2">
        {/* Column buttons */}
        <div className="flex mb-2">
          {Array(COLS).fill(null).map((_, col) => (
            <button
              key={col}
              onClick={() => dropPiece(col)}
              disabled={winner !== null || aiThinking || currentPlayer === 'yellow'}
              className="flex-1 p-1 opacity-0 hover:opacity-20 disabled:opacity-0 h-8 bg-white rounded-full mx-1 transition-opacity"
              aria-label={`Drop piece in column ${col + 1}`}
            />
          ))}
        </div>
        
        {/* Game board */}
        <div className="bg-blue-600 rounded">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, colIdx) => (
                <div 
                  key={`${rowIdx}-${colIdx}`} 
                  className="p-1 aspect-square w-full"
                >
                  <div 
                    className={`w-full h-full rounded-full ${
                      cell === 'red' 
                        ? 'bg-red-500' 
                        : cell === 'yellow' 
                          ? 'bg-yellow-500' 
                          : 'bg-white'
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectFour;
