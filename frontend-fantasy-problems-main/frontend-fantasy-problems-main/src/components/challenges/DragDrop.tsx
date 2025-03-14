
import React, { useState } from 'react';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface BoardState {
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

const DragDrop: React.FC = () => {
  // Initial state with some sample data
  const initialData: BoardState = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
      'task-5': { id: 'task-5', content: 'Read a book' },
      'task-6': { id: 'task-6', content: 'Exercise' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: ['task-4', 'task-5'],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: ['task-6'],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };

  const [boardState, setBoardState] = useState<BoardState>(initialData);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingOverColumnId, setDraggingOverColumnId] = useState<string | null>(null);

  // Start dragging a task
  const handleDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  // Handle when a task is being dragged over a column
  const handleDragOver = (columnId: string, e: React.DragEvent) => {
    e.preventDefault();
    if (draggingOverColumnId !== columnId) {
      setDraggingOverColumnId(columnId);
    }
  };

  // Handle dropping a task into a column
  const handleDrop = (columnId: string, e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggingTaskId) return;
    
    // Find the source column (where the task was originally)
    let sourceColumnId: string | null = null;
    for (const colId in boardState.columns) {
      if (boardState.columns[colId].taskIds.includes(draggingTaskId)) {
        sourceColumnId = colId;
        break;
      }
    }
    
    if (!sourceColumnId || sourceColumnId === columnId) {
      // If we couldn't find the source column or it's the same as the destination, do nothing
      setDraggingTaskId(null);
      setDraggingOverColumnId(null);
      return;
    }
    
    // Create new state
    const newBoardState = structuredClone(boardState);
    
    // Remove task from source column
    newBoardState.columns[sourceColumnId].taskIds = 
      newBoardState.columns[sourceColumnId].taskIds.filter(id => id !== draggingTaskId);
    
    // Add task to destination column
    newBoardState.columns[columnId].taskIds.push(draggingTaskId);
    
    // Update state
    setBoardState(newBoardState);
    setDraggingTaskId(null);
    setDraggingOverColumnId(null);
  };

  // End dragging
  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setDraggingOverColumnId(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boardState.columnOrder.map(columnId => {
          const column = boardState.columns[columnId];
          const tasks = column.taskIds.map(taskId => boardState.tasks[taskId]);
          
          return (
            <div 
              key={column.id}
              className={`p-4 rounded-lg border ${draggingOverColumnId === column.id ? 'bg-primary/10' : 'bg-card'}`}
              onDragOver={(e) => handleDragOver(column.id, e)}
              onDrop={(e) => handleDrop(column.id, e)}
            >
              <h3 className="font-semibold text-lg mb-3">{column.title}</h3>
              <div className="space-y-2">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onDragEnd={handleDragEnd}
                    className={`p-3 bg-white rounded shadow-sm border border-primary/10 cursor-move 
                      ${draggingTaskId === task.id ? 'opacity-50' : 'opacity-100'}`}
                  >
                    {task.content}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <p>Drag and drop tasks between columns to change their status.</p>
        <p className="mt-2">Note: This is a simplified implementation. In a real app, you might want to use a library like react-beautiful-dnd or dnd-kit for more sophisticated drag and drop interactions.</p>
      </div>
    </div>
  );
};

export default DragDrop;
