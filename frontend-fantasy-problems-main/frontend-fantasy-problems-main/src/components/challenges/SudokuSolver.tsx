
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

type SudokuGrid = (number | null)[][];

const SudokuSolver: React.FC = () => {
  const [grid, setGrid] = useState<SudokuGrid>([]);
  const [originalGrid, setOriginalGrid] = useState<SudokuGrid>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const { toast } = useToast();

  // Initialize empty grid
  const initializeEmptyGrid = () => {
    const newGrid: SudokuGrid = [];
    for (let i = 0; i < 9; i++) {
      newGrid.push(Array(9).fill(null));
    }
    return newGrid;
  };

  // Initialize the grid on component mount
  useEffect(() => {
    resetGrid();
  }, []);

  // Reset the grid
  const resetGrid = () => {
    const emptyGrid = initializeEmptyGrid();
    setGrid(emptyGrid);
    setOriginalGrid(JSON.parse(JSON.stringify(emptyGrid)));
    setSelectedCell(null);
    setIsSolved(false);
  };

  // Load a sample puzzle
  const loadSamplePuzzle = () => {
    const samplePuzzle: SudokuGrid = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ];
    setGrid(samplePuzzle);
    setOriginalGrid(JSON.parse(JSON.stringify(samplePuzzle)));
    setSelectedCell(null);
    setIsSolved(false);
  };

  // Check if a move is valid
  const isValidMove = (row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[boxRow + r][boxCol + c] === num) return false;
      }
    }

    return true;
  };

  // Solve the puzzle using backtracking
  const solveSudoku = async () => {
    setIsSolving(true);
    
    const solveBacktrack = (board: SudokuGrid): boolean => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === null) {
            for (let num = 1; num <= 9; num++) {
              if (isValidPlacement(board, row, col, num)) {
                board[row][col] = num;
                
                if (solveBacktrack(board)) {
                  return true;
                }
                
                board[row][col] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    
    const isValidPlacement = (board: SudokuGrid, row: number, col: number, num: number): boolean => {
      // Check row
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
      }

      // Check column
      for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
      }

      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[boxRow + r][boxCol + c] === num) return false;
        }
      }

      return true;
    };
    
    // Create a copy of the grid
    const gridCopy: SudokuGrid = JSON.parse(JSON.stringify(grid));
    
    // Check if the current grid is valid before solving
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = gridCopy[row][col];
        if (value !== null) {
          // Temporarily remove the value to check if it's valid
          gridCopy[row][col] = null;
          if (!isValidPlacement(gridCopy, row, col, value)) {
            setIsSolving(false);
            toast({
              title: "Invalid puzzle",
              description: `The number ${value} at row ${row + 1}, column ${col + 1} violates Sudoku rules.`,
              variant: "destructive",
            });
            return;
          }
          // Restore the value
          gridCopy[row][col] = value;
        }
      }
    }
    
    // Solve the puzzle
    const result = solveBacktrack(gridCopy);
    
    if (result) {
      // Animate the solution
      const tempGrid = JSON.parse(JSON.stringify(grid));
      
      // Find cells to fill
      const cellsToFill: [number, number, number][] = [];
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (tempGrid[row][col] === null) {
            cellsToFill.push([row, col, gridCopy[row][col]]);
          }
        }
      }
      
      // Fill cells one by one with a delay
      const fillCellsWithDelay = async () => {
        for (const [row, col, value] of cellsToFill) {
          await new Promise(resolve => setTimeout(resolve, 50));
          tempGrid[row][col] = value;
          setGrid([...tempGrid]);
        }
        setIsSolved(true);
        setIsSolving(false);
      };
      
      fillCellsWithDelay();
    } else {
      setIsSolving(false);
      toast({
        title: "No solution",
        description: "This puzzle cannot be solved.",
        variant: "destructive",
      });
    }
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (originalGrid[row][col] === null && !isSolving) {
      setSelectedCell([row, col]);
    }
  };

  // Handle number input
  const handleNumberInput = (num: number | null) => {
    if (selectedCell && !isSolving) {
      const [row, col] = selectedCell;
      
      // Don't allow changing original numbers
      if (originalGrid[row][col] !== null) return;
      
      // Update the grid
      const newGrid = [...grid];
      newGrid[row][col] = num;
      setGrid(newGrid);
      
      // Check if this move made the puzzle invalid
      if (num !== null && !isValidMove(row, col, num)) {
        toast({
          title: "Invalid move",
          description: `${num} already exists in the same row, column, or box.`,
          variant: "destructive",
        });
      }
    }
  };

  // Get the cell background color
  const getCellBgColor = (row: number, col: number): string => {
    // Original numbers
    if (originalGrid[row][col] !== null) {
      return 'bg-gray-100';
    }
    
    // Selected cell
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      return 'bg-blue-100';
    }
    
    // Solved cells
    if (grid[row][col] !== null && originalGrid[row][col] === null) {
      return isSolved ? 'bg-green-50' : 'bg-white';
    }
    
    return 'bg-white';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Sudoku Solver</h2>
      <p className="mb-4 text-muted-foreground">
        Solve Sudoku puzzles using backtracking algorithm. Click cells to select, then use the number pad or keyboard to input values.
      </p>
      
      <div className="flex mb-4 space-x-4">
        <Button onClick={resetGrid} variant="outline" disabled={isSolving}>
          Reset
        </Button>
        <Button onClick={loadSamplePuzzle} variant="outline" disabled={isSolving}>
          Load Sample
        </Button>
        <Button onClick={solveSudoku} disabled={isSolving || isSolved}>
          {isSolving ? 'Solving...' : 'Solve'}
        </Button>
      </div>
      
      <div className="mb-8 border-2 border-black">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex ${rowIndex % 3 === 2 && rowIndex < 8 ? 'border-b-2 border-black' : ''}`}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center justify-center w-10 h-10 border ${
                  colIndex % 3 === 2 && colIndex < 8 ? 'border-r-2 border-r-black' : 'border-gray-300'
                } ${getCellBgColor(rowIndex, colIndex)} cursor-pointer font-bold text-lg select-none`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== null ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Click a cell, then click a number below or use your keyboard to input a value.
          Click the same number twice to remove it.
        </p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <Button
              key={num}
              variant="outline"
              className="w-10 h-10 p-0"
              onClick={() => {
                if (selectedCell) {
                  const [row, col] = selectedCell;
                  handleNumberInput(grid[row][col] === num ? null : num);
                }
              }}
              disabled={isSolving}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="px-4"
            onClick={() => {
              if (selectedCell) {
                handleNumberInput(null);
              }
            }}
            disabled={isSolving}
          >
            Clear
          </Button>
        </div>
      </div>
      
      {isSolved && (
        <div className="p-3 bg-green-100 rounded-md">
          Puzzle solved successfully!
        </div>
      )}
    </div>
  );
};

export default SudokuSolver;
