
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Cell {
  key: string;
  value: string;
  formula: string;
  computed: string | number;
  dependencies: string[];
}

type SpreadsheetData = {
  [key: string]: Cell;
};

const Spreadsheet: React.FC = () => {
  const [data, setData] = useState<SpreadsheetData>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [rows, setRows] = useState(8);
  const [cols, setColumns] = useState(6);
  const { toast } = useToast();

  // Initialize the spreadsheet
  useEffect(() => {
    initializeSpreadsheet();
  }, [rows, cols]);

  const initializeSpreadsheet = () => {
    const initialData: SpreadsheetData = {};
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cellKey = getCellKey(row, col);
        initialData[cellKey] = {
          key: cellKey,
          value: '',
          formula: '',
          computed: '',
          dependencies: [],
        };
      }
    }
    
    setData(initialData);
  };

  // Get cell coordinates from key
  const getCellCoords = (key: string): [number, number] => {
    const row = parseInt(key.substring(1)) - 1;
    const col = key.charCodeAt(0) - 65;
    return [row, col];
  };

  // Get cell key from coordinates
  const getCellKey = (row: number, col: number): string => {
    return `${String.fromCharCode(65 + col)}${row + 1}`;
  };

  // Select a cell
  const selectCell = (key: string) => {
    setSelectedCell(key);
    setEditValue(data[key]?.formula || data[key]?.value || '');
  };

  // Handle cell edit
  const handleCellEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle formula submission
  const handleCellBlur = () => {
    if (!selectedCell) return;
    
    try {
      updateCell(selectedCell, editValue);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Formula Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  // Update a cell and recalculate dependents
  const updateCell = (key: string, value: string) => {
    // Check if value is a formula
    const isFormula = value.startsWith('=');
    
    // Create a new cell object
    const newCell: Cell = {
      ...data[key],
      key,
      value: isFormula ? '' : value,
      formula: isFormula ? value : '',
      computed: isFormula ? evaluateFormula(key, value) : value,
      dependencies: isFormula ? extractDependencies(value) : [],
    };
    
    // Update the data state
    setData(prevData => {
      const newData = { ...prevData, [key]: newCell };
      
      // Recalculate cells that depend on this cell
      const visited = new Set<string>();
      const recalculateDependents = (cellKey: string) => {
        if (visited.has(cellKey)) return;
        visited.add(cellKey);
        
        // Find all cells that depend on this cell
        Object.keys(newData).forEach(k => {
          if (newData[k].dependencies.includes(cellKey)) {
            try {
              newData[k] = {
                ...newData[k],
                computed: evaluateFormula(k, newData[k].formula, newData),
              };
              recalculateDependents(k);
            } catch (error) {
              if (error instanceof Error) {
                newData[k] = {
                  ...newData[k],
                  computed: `#ERROR: ${error.message}`,
                };
              }
            }
          }
        });
      };
      
      recalculateDependents(key);
      return newData;
    });
  };

  // Extract cell dependencies from a formula
  const extractDependencies = (formula: string): string[] => {
    if (!formula.startsWith('=')) return [];
    
    // Regular expression to match cell references (e.g., A1, B2)
    const cellRefRegex = /[A-Z]\d+/g;
    const matches = formula.match(cellRefRegex) || [];
    
    return [...new Set(matches)]; // Remove duplicates
  };

  // Evaluate a formula
  const evaluateFormula = (cellKey: string, formula: string, spreadsheetData: SpreadsheetData = data): string | number => {
    if (!formula.startsWith('=')) return formula;
    
    // Remove the equals sign
    let expression = formula.substring(1);
    
    // Check for circular references
    const dependencies = extractDependencies(formula);
    const visited = new Set<string>();
    const checkCircular = (cell: string, path: string[] = []): boolean => {
      if (visited.has(cell)) return false;
      if (path.includes(cell)) return true;
      
      visited.add(cell);
      path.push(cell);
      
      const deps = spreadsheetData[cell]?.dependencies || [];
      for (const dep of deps) {
        if (checkCircular(dep, [...path])) return true;
      }
      
      return false;
    };
    
    if (checkCircular(cellKey)) {
      throw new Error('Circular reference detected');
    }
    
    // Replace cell references with their values
    const cellRefRegex = /[A-Z]\d+/g;
    expression = expression.replace(cellRefRegex, (match) => {
      const cell = spreadsheetData[match];
      if (!cell) {
        throw new Error(`Cell ${match} not found`);
      }
      
      const value = cell.computed;
      if (value === '') return '0';
      if (typeof value === 'string' && value.startsWith('#ERROR')) {
        throw new Error(`Reference to cell with error: ${match}`);
      }
      
      return typeof value === 'number' || !isNaN(Number(value)) 
        ? value.toString() 
        : `"${value}"`;
    });
    
    // Add support for SUM, AVERAGE functions
    expression = expression.replace(/SUM\((.*?)\)/gi, (match, range) => {
      const rangeExpression = parseRange(range, spreadsheetData);
      return `(${rangeExpression.join('+')})`;
    });
    
    expression = expression.replace(/AVERAGE\((.*?)\)/gi, (match, range) => {
      const rangeValues = parseRange(range, spreadsheetData);
      if (rangeValues.length === 0) return '0';
      return `(${rangeValues.join('+')}/${rangeValues.length})`;
    });
    
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expression});`)();
      return result;
    } catch (error) {
      throw new Error('Invalid formula');
    }
  };

  // Parse a range expression (e.g., A1:B3)
  const parseRange = (range: string, spreadsheetData: SpreadsheetData): string[] => {
    range = range.trim();
    if (range.includes(':')) {
      const [start, end] = range.split(':');
      const [startRow, startCol] = getCellCoords(start);
      const [endRow, endCol] = getCellCoords(end);
      
      const cells: string[] = [];
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const cellKey = getCellKey(row, col);
          if (spreadsheetData[cellKey]) {
            const value = spreadsheetData[cellKey].computed;
            if (value !== '' && !isNaN(Number(value))) {
              cells.push(value.toString());
            } else {
              cells.push('0');
            }
          }
        }
      }
      return cells;
    } else {
      return range.split(',').map(cellKey => {
        cellKey = cellKey.trim();
        if (spreadsheetData[cellKey]) {
          const value = spreadsheetData[cellKey].computed;
          return value !== '' && !isNaN(Number(value)) ? value.toString() : '0';
        }
        return '0';
      });
    }
  };

  // Add a row
  const addRow = () => {
    setRows(rows + 1);
  };

  // Add a column
  const addColumn = () => {
    setColumns(cols + 1);
  };

  // Load example data
  const loadExample = () => {
    const newData = { ...data };
    
    // Example data with formulas
    const examples = [
      { key: 'A1', value: '10', formula: '', computed: '10', dependencies: [] },
      { key: 'A2', value: '20', formula: '', computed: '20', dependencies: [] },
      { key: 'A3', value: '30', formula: '', computed: '30', dependencies: [] },
      { key: 'B1', value: '', formula: '=A1*2', computed: 20, dependencies: ['A1'] },
      { key: 'B2', value: '', formula: '=A2*2', computed: 40, dependencies: ['A2'] },
      { key: 'B3', value: '', formula: '=A3*2', computed: 60, dependencies: ['A3'] },
      { key: 'C1', value: '', formula: '=SUM(A1:A3)', computed: 60, dependencies: ['A1', 'A2', 'A3'] },
      { key: 'C2', value: '', formula: '=AVERAGE(A1:A3)', computed: 20, dependencies: ['A1', 'A2', 'A3'] },
      { key: 'C3', value: '', formula: '=B1+B2+B3', computed: 120, dependencies: ['B1', 'B2', 'B3'] }
    ];
    
    examples.forEach(example => {
      if (newData[example.key]) {
        newData[example.key] = { ...example };
      }
    });
    
    setData(newData);
  };

  // Clear spreadsheet
  const clearSheet = () => {
    initializeSpreadsheet();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Interactive Spreadsheet</h2>
      <p className="mb-4 text-muted-foreground">
        A spreadsheet with formula support. Use cell references and functions like SUM() and AVERAGE().
      </p>
      
      <div className="flex items-center mb-4 space-x-2">
        <Button onClick={clearSheet} variant="outline" size="sm">
          Clear
        </Button>
        <Button onClick={loadExample} variant="outline" size="sm">
          Load Example
        </Button>
        <Button onClick={addRow} variant="outline" size="sm">
          Add Row
        </Button>
        <Button onClick={addColumn} variant="outline" size="sm">
          Add Column
        </Button>
      </div>
      
      {selectedCell && (
        <div className="mb-4 flex items-center">
          <div className="w-16 font-bold">{selectedCell}:</div>
          <Input
            value={editValue}
            onChange={handleCellEdit}
            onBlur={handleCellBlur}
            className="flex-1"
            placeholder="Enter value or formula (e.g. =A1+B1)"
          />
        </div>
      )}
      
      <div className="bg-card border rounded-lg overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-10 border-r border-b bg-muted"></th>
              {Array.from({ length: cols }, (_, i) => (
                <th key={i} className="w-24 border-r border-b bg-muted text-center py-1">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border-r border-b bg-muted text-center text-xs font-mono py-1">
                  {rowIndex + 1}
                </td>
                {Array.from({ length: cols }, (_, colIndex) => {
                  const cellKey = getCellKey(rowIndex, colIndex);
                  const cell = data[cellKey] || { value: '', formula: '', computed: '' };
                  
                  return (
                    <td
                      key={colIndex}
                      className={`border-r border-b text-sm p-1 ${
                        selectedCell === cellKey ? 'bg-blue-50' : ''
                      } ${cell.formula ? 'font-mono' : ''}`}
                      onClick={() => selectCell(cellKey)}
                    >
                      {cell.computed}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Tip: Type formulas starting with = (e.g., =A1+B1)</p>
        <p>Functions: SUM(A1:A3), AVERAGE(A1:A3)</p>
      </div>
    </div>
  );
};

export default Spreadsheet;
