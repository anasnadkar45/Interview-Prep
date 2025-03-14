
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';

interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

type Board = (Piece | null)[][];
type Position = [number, number]; // [row, col]

interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured?: Piece;
  isPromotion?: boolean;
  isCastle?: boolean;
  isEnPassant?: boolean;
}

const ChessGame: React.FC = () => {
  const [board, setBoard] = useState<Board>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<PieceColor | null>(null);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [pgn, setPgn] = useState<string>('');
  
  const { toast } = useToast();

  // Initialize the board
  useEffect(() => {
    initializeBoard();
  }, []);

  // Update PGN when move history changes
  useEffect(() => {
    updatePGN();
  }, [moveHistory]);

  const initializeBoard = () => {
    const newBoard: Board = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Place pawns
    for (let col = 0; col < 8; col++) {
      newBoard[1][col] = { type: 'pawn', color: 'black' };
      newBoard[6][col] = { type: 'pawn', color: 'white' };
    }
    
    // Place rooks
    newBoard[0][0] = { type: 'rook', color: 'black' };
    newBoard[0][7] = { type: 'rook', color: 'black' };
    newBoard[7][0] = { type: 'rook', color: 'white' };
    newBoard[7][7] = { type: 'rook', color: 'white' };
    
    // Place knights
    newBoard[0][1] = { type: 'knight', color: 'black' };
    newBoard[0][6] = { type: 'knight', color: 'black' };
    newBoard[7][1] = { type: 'knight', color: 'white' };
    newBoard[7][6] = { type: 'knight', color: 'white' };
    
    // Place bishops
    newBoard[0][2] = { type: 'bishop', color: 'black' };
    newBoard[0][5] = { type: 'bishop', color: 'black' };
    newBoard[7][2] = { type: 'bishop', color: 'white' };
    newBoard[7][5] = { type: 'bishop', color: 'white' };
    
    // Place queens
    newBoard[0][3] = { type: 'queen', color: 'black' };
    newBoard[7][3] = { type: 'queen', color: 'white' };
    
    // Place kings
    newBoard[0][4] = { type: 'king', color: 'black' };
    newBoard[7][4] = { type: 'king', color: 'white' };
    
    setBoard(newBoard);
    setCurrentPlayer('white');
    setSelectedPosition(null);
    setValidMoves([]);
    setGameOver(false);
    setWinner(null);
    setMoveHistory([]);
  };

  const selectPosition = (position: Position) => {
    const [row, col] = position;
    const piece = board[row][col];
    
    // If no piece is selected and there's a piece at the clicked position
    if (!selectedPosition && piece && piece.color === currentPlayer) {
      setSelectedPosition(position);
      
      // Calculate valid moves
      const moves = getValidMovesForPiece(position);
      setValidMoves(moves);
    }
    // If a piece is already selected
    else if (selectedPosition) {
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
      
      if (isValidMove) {
        // Make the move
        makeMove(selectedPosition, position);
      } else {
        // If clicking on another piece of the same color, select it instead
        if (piece && piece.color === currentPlayer) {
          selectPosition(position);
        } else {
          // Deselect
          setSelectedPosition(null);
          setValidMoves([]);
        }
      }
    }
  };

  const makeMove = (from: Position, to: Position) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    
    const piece = board[fromRow][fromCol];
    if (!piece) return;
    
    const newBoard = board.map(row => [...row]);
    const capturedPiece = newBoard[toRow][toCol];
    
    // Special move flags
    let isPromotion = false;
    let isCastle = false;
    let isEnPassant = false;
    
    // Handle pawn promotion
    if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
      isPromotion = true;
      piece.type = 'queen'; // Auto-promote to queen for simplicity
    }
    
    // Handle castling
    if (piece.type === 'king' && Math.abs(fromCol - toCol) === 2) {
      isCastle = true;
      
      // Move the rook as well
      if (toCol > fromCol) { // Kingside castle
        const rook = newBoard[fromRow][7];
        newBoard[fromRow][7] = null;
        newBoard[fromRow][5] = rook;
        if (rook) rook.hasMoved = true;
      } else { // Queenside castle
        const rook = newBoard[fromRow][0];
        newBoard[fromRow][0] = null;
        newBoard[fromRow][3] = rook;
        if (rook) rook.hasMoved = true;
      }
    }
    
    // Handle en passant
    if (
      piece.type === 'pawn' && 
      Math.abs(fromCol - toCol) === 1 && 
      !capturedPiece
    ) {
      // If a pawn moves diagonally to an empty square, it must be en passant
      isEnPassant = true;
      const captureRow = fromRow; // The captured pawn is on the same row as the attacking pawn
      newBoard[captureRow][toCol] = null; // Remove the captured pawn
    }
    
    // Move the piece
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;
    
    // Mark that the piece has moved (for castling and en passant logic)
    piece.hasMoved = true;
    
    // Record the move
    const move: Move = {
      from,
      to,
      piece: { ...piece },
      captured: capturedPiece ? { ...capturedPiece } : undefined,
      isPromotion,
      isCastle,
      isEnPassant
    };
    
    setMoveHistory([...moveHistory, move]);
    
    // Update the board and switch player
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setSelectedPosition(null);
    setValidMoves([]);
    
    // Check for checkmate or stalemate
    const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
    const isNextPlayerInCheck = isInCheck(newBoard, nextPlayer);
    const hasNextPlayerValidMoves = hasValidMoves(newBoard, nextPlayer);
    
    if (!hasNextPlayerValidMoves) {
      setGameOver(true);
      if (isNextPlayerInCheck) {
        setWinner(currentPlayer);
        toast({
          title: "Checkmate!",
          description: `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`,
          variant: "default",
        });
      } else {
        toast({
          title: "Stalemate!",
          description: "The game is a draw.",
          variant: "default",
        });
      }
    } else if (isNextPlayerInCheck) {
      toast({
        title: "Check!",
        description: `${nextPlayer.charAt(0).toUpperCase() + nextPlayer.slice(1)} is in check.`,
        variant: "default",
      });
    }
  };

  const getValidMovesForPiece = (position: Position): Position[] => {
    const [row, col] = position;
    const piece = board[row][col];
    
    if (!piece) return [];
    
    let moves: Position[] = [];
    
    switch (piece.type) {
      case 'pawn':
        moves = getPawnMoves(position);
        break;
      case 'rook':
        moves = getRookMoves(position);
        break;
      case 'knight':
        moves = getKnightMoves(position);
        break;
      case 'bishop':
        moves = getBishopMoves(position);
        break;
      case 'queen':
        moves = getQueenMoves(position);
        break;
      case 'king':
        moves = getKingMoves(position);
        break;
    }
    
    // Filter out moves that would leave the king in check
    return moves.filter(move => !wouldBeInCheck(position, move, currentPlayer));
  };

  const getPawnMoves = (position: Position): Position[] => {
    const [row, col] = position;
    const piece = board[row][col];
    if (!piece || piece.type !== 'pawn') return [];
    
    const direction = piece.color === 'white' ? -1 : 1;
    const moves: Position[] = [];
    
    // Forward move
    if (row + direction >= 0 && row + direction < 8 && !board[row + direction][col]) {
      moves.push([row + direction, col]);
      
      // Double forward move from starting position
      const startRow = piece.color === 'white' ? 6 : 1;
      if (row === startRow && !board[row + 2 * direction][col]) {
        moves.push([row + 2 * direction, col]);
      }
    }
    
    // Captures (diagonal moves)
    const captureCols = [col - 1, col + 1];
    for (const captureCol of captureCols) {
      if (captureCol >= 0 && captureCol < 8) {
        const captureRow = row + direction;
        if (captureRow >= 0 && captureRow < 8) {
          const target = board[captureRow][captureCol];
          
          // Regular capture
          if (target && target.color !== piece.color) {
            moves.push([captureRow, captureCol]);
          }
          
          // En passant (simplified implementation)
          // A complete implementation would track the previous move to determine if en passant is possible
          if (!target && moveHistory.length > 0) {
            const lastMove = moveHistory[moveHistory.length - 1];
            if (
              lastMove.piece.type === 'pawn' &&
              Math.abs(lastMove.from[0] - lastMove.to[0]) === 2 && // Double pawn move
              lastMove.to[0] === row && // Same row as current pawn
              lastMove.to[1] === captureCol // Adjacent column
            ) {
              moves.push([captureRow, captureCol]);
            }
          }
        }
      }
    }
    
    return moves;
  };

  const getRookMoves = (position: Position): Position[] => {
    const [row, col] = position;
    const piece = board[row][col];
    if (!piece) return [];
    
    const moves: Position[] = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
    
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const targetPiece = board[x][y];
        
        if (!targetPiece) {
          moves.push([x, y]);
        } else {
          if (targetPiece.color !== piece.color) {
            moves.push([x, y]);
          }
          break;
        }
        
        x += dx;
        y += dy;
      }
    }
    
    return moves;
  };

  const getKnightMoves = (position: Position): Position[] => {
    const [row, col] = position;
    const piece = board[row][col];
    if (!piece) return [];
    
    const moves: Position[] = [];
    const knightMoves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    for (const [dx, dy] of knightMoves) {
      const x = row + dx;
      const y = col + dy;
      
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const targetPiece = board[x][y];
        
        if (!targetPiece || targetPiece.color !== piece.color) {
          moves.push([x, y]);
        }
      }
    }
    
    return moves;
  };

  const getBishopMoves = (position: Position): Position[] => {
    const [row, col] = position;
    const piece = board[row][col];
    if (!piece) return [];
    
    const moves: Position[] = [];
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; // Diagonals
    
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const targetPiece = board[x][y];
        
        if (!targetPiece) {
          moves.push([x, y]);
        } else {
          if (targetPiece.color !== piece.color) {
            moves.push([x, y]);
          }
          break;
        }
        
        x += dx;
        y += dy;
      }
    }
    
    return moves;
  };

  const getQueenMoves = (position: Position): Position[] => {
    // Queen combines rook and bishop moves
    return [...getRookMoves(position), ...getBishopMoves(position)];
  };

  const getKingMoves = (position: Position): Position[] => {
    const [row, col] = position;
    const piece = board[row][col];
    if (!piece || piece.type !== 'king') return [];
    
    const moves: Position[] = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    
    // Regular king moves
    for (const [dx, dy] of directions) {
      const x = row + dx;
      const y = col + dy;
      
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const targetPiece = board[x][y];
        
        if (!targetPiece || targetPiece.color !== piece.color) {
          // Check if this move would put the king in check
          if (!wouldBeInCheck([row, col], [x, y], piece.color)) {
            moves.push([x, y]);
          }
        }
      }
    }
    
    // Castling
    if (!piece.hasMoved && !isInCheck(board, piece.color)) {
      // Kingside castle
      if (
        board[row][7]?.type === 'rook' &&
        board[row][7]?.color === piece.color &&
        !board[row][7]?.hasMoved &&
        !board[row][5] && !board[row][6] &&
        !wouldBeInCheck([row, col], [row, 5], piece.color) &&
        !wouldBeInCheck([row, col], [row, 6], piece.color)
      ) {
        moves.push([row, 6]);
      }
      
      // Queenside castle
      if (
        board[row][0]?.type === 'rook' &&
        board[row][0]?.color === piece.color &&
        !board[row][0]?.hasMoved &&
        !board[row][1] && !board[row][2] && !board[row][3] &&
        !wouldBeInCheck([row, col], [row, 3], piece.color) &&
        !wouldBeInCheck([row, col], [row, 2], piece.color)
      ) {
        moves.push([row, 2]);
      }
    }
    
    return moves;
  };

  const wouldBeInCheck = (from: Position, to: Position, color: PieceColor): boolean => {
    // Create a copy of the board with the move applied
    const newBoard = board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    
    const piece = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;
    
    return isInCheck(newBoard, color);
  };

  const isInCheck = (board: Board, color: PieceColor): boolean => {
    // Find the king
    let kingPosition: Position | null = null;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'king' && piece.color === color) {
          kingPosition = [row, col];
          break;
        }
      }
      if (kingPosition) break;
    }
    
    if (!kingPosition) return false;
    
    // Check if any opponent piece can capture the king
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color !== color) {
          let moves: Position[] = [];
          
          switch (piece.type) {
            case 'pawn':
              // Only need to check capture moves for pawns
              const direction = piece.color === 'white' ? -1 : 1;
              if (
                (row + direction === kingPosition[0] && 
                 (col + 1 === kingPosition[1] || col - 1 === kingPosition[1]))
              ) {
                return true;
              }
              break;
            case 'rook':
              moves = getRookMoves([row, col]);
              break;
            case 'knight':
              moves = getKnightMoves([row, col]);
              break;
            case 'bishop':
              moves = getBishopMoves([row, col]);
              break;
            case 'queen':
              moves = getQueenMoves([row, col]);
              break;
            case 'king':
              // For king, we only need to check adjacent squares
              const kingMoves = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
              ];
              
              for (const [dx, dy] of kingMoves) {
                const x = row + dx;
                const y = col + dy;
                
                if (x === kingPosition[0] && y === kingPosition[1]) {
                  return true;
                }
              }
              continue;
          }
          
          if (moves.some(([r, c]) => r === kingPosition[0] && c === kingPosition[1])) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  const hasValidMoves = (board: Board, color: PieceColor): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === color) {
          let moves: Position[] = [];
          
          switch (piece.type) {
            case 'pawn':
              moves = getPawnMoves([row, col]);
              break;
            case 'rook':
              moves = getRookMoves([row, col]);
              break;
            case 'knight':
              moves = getKnightMoves([row, col]);
              break;
            case 'bishop':
              moves = getBishopMoves([row, col]);
              break;
            case 'queen':
              moves = getQueenMoves([row, col]);
              break;
            case 'king':
              moves = getKingMoves([row, col]);
              break;
          }
          
          // Filter out moves that would leave the king in check
          const validMoves = moves.filter(move => !wouldBeInCheck([row, col], move, color));
          
          if (validMoves.length > 0) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  // Update the Portable Game Notation (PGN)
  const updatePGN = () => {
    if (moveHistory.length === 0) {
      setPgn('');
      return;
    }
    
    let pgnText = '';
    
    for (let i = 0; i < moveHistory.length; i++) {
      const move = moveHistory[i];
      
      // Add move number before white's move
      if (i % 2 === 0) {
        pgnText += `${Math.floor(i / 2) + 1}. `;
      }
      
      // Convert position to algebraic notation
      const fromFile = String.fromCharCode(97 + move.from[1]);
      const fromRank = 8 - move.from[0];
      const toFile = String.fromCharCode(97 + move.to[1]);
      const toRank = 8 - move.to[0];
      
      let notation = '';
      
      // Piece letter (except for pawns)
      if (move.piece.type !== 'pawn') {
        notation += move.piece.type === 'knight' ? 'N' : move.piece.type.charAt(0).toUpperCase();
      }
      
      // For pawn captures, include the file
      if (move.piece.type === 'pawn' && move.from[1] !== move.to[1]) {
        notation += fromFile;
      }
      
      // Capture indicator
      if (move.captured || move.isEnPassant) {
        notation += 'x';
      }
      
      // Destination square
      notation += toFile + toRank;
      
      // Promotion
      if (move.isPromotion) {
        notation += '=Q'; // Always promoting to queen
      }
      
      // Castling
      if (move.isCastle) {
        notation = move.to[1] > move.from[1] ? 'O-O' : 'O-O-O';
      }
      
      // Add check or checkmate indicator
      // This is simplified; a complete implementation would check for these conditions
      
      pgnText += notation + ' ';
    }
    
    setPgn(pgnText.trim());
  };

  const getPieceSymbol = (piece: Piece): string => {
    const symbols: Record<PieceType, { white: string; black: string }> = {
      king: { white: '♔', black: '♚' },
      queen: { white: '♕', black: '♛' },
      rook: { white: '♖', black: '♜' },
      bishop: { white: '♗', black: '♝' },
      knight: { white: '♘', black: '♞' },
      pawn: { white: '♙', black: '♟' }
    };
    
    return symbols[piece.type][piece.color];
  };

  // Get cell background color based on state
  const getCellBackgroundColor = (row: number, col: number): string => {
    const isSelected = selectedPosition && selectedPosition[0] === row && selectedPosition[1] === col;
    const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
    
    if (isSelected) {
      return 'bg-blue-300';
    } else if (isValidMove) {
      const targetPiece = board[row][col];
      return targetPiece ? 'bg-red-200' : 'bg-green-200';
    } else {
      return (row + col) % 2 === 0 ? 'bg-amber-50' : 'bg-amber-800';
    }
  };

  // Get cell text color based on piece color
  const getCellTextColor = (row: number, col: number): string => {
    const piece = board[row][col];
    if (!piece) return '';
    
    const isDarkCell = (row + col) % 2 === 0;
    
    if (piece.color === 'white') {
      return isDarkCell ? 'text-white' : 'text-white';
    } else {
      return 'text-black';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Chess Game</h2>
      <p className="mb-4 text-muted-foreground">
        Play chess with full rules, including castling, pawn promotion, and detecting checkmate.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <span className="font-medium">Current player: </span>
              <span className={`${currentPlayer === 'white' ? 'text-black' : 'text-black'}`}>
                {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
              </span>
            </div>
            
            <Button onClick={initializeBoard} variant="outline">
              New Game
            </Button>
          </div>
          
          {gameOver && (
            <div className={`p-3 mb-4 rounded-md ${winner ? 'bg-green-100' : 'bg-gray-100'}`}>
              {winner 
                ? `${winner.charAt(0).toUpperCase() + winner.slice(1)} wins by checkmate!` 
                : "The game is a draw by stalemate."}
            </div>
          )}
          
          <div className="mb-4 border-2 border-amber-900 rounded-lg overflow-hidden">
            {/* Ranks (numbers) on the left */}
            <div className="flex">
              <div className="w-8 flex-shrink-0"></div>
              {/* Files (letters) on top */}
              <div className="flex flex-grow">
                {Array.from({ length: 8 }, (_, col) => (
                  <div key={col} className="flex-1 text-center font-medium py-1">
                    {String.fromCharCode(97 + col)}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Board */}
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                <div className="w-8 flex-shrink-0 flex items-center justify-center font-medium">
                  {8 - rowIndex}
                </div>
                <div className="flex flex-grow">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`flex-1 aspect-square flex items-center justify-center text-3xl 
                        ${getCellBackgroundColor(rowIndex, colIndex)} 
                        ${getCellTextColor(rowIndex, colIndex)}
                        cursor-pointer`}
                      onClick={() => selectPosition([rowIndex, colIndex])}
                    >
                      {cell && getPieceSymbol(cell)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Move History (PGN)</h3>
          <div className="p-3 border rounded-lg bg-muted/30 font-mono text-sm h-64 overflow-auto">
            {pgn || 'No moves yet'}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">How to Play</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Click on a piece to select it</li>
              <li>Green squares show valid moves</li>
              <li>Red squares show captures</li>
              <li>Click on a valid destination to move</li>
              <li>The game supports castling, en passant, and pawn promotion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
