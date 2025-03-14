
import React, { useState, useEffect } from 'react';
import { Check, Trash, Plus, X, Edit, Save } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoListSolution: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // Add new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTodoText.trim()) return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };
  
  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Start editing todo
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  // Save edited todo
  const saveEdit = () => {
    if (!editText.trim()) return;
    
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editText.trim() } : todo
    ));
    
    setEditingId(null);
  };
  
  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg flex items-center"
          disabled={!newTodoText.trim()}
        >
          <Plus size={16} />
        </button>
      </form>
      
      {todos.length > 0 && (
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded-md ${
                filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-xs rounded-md ${
                filter === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-xs rounded-md ${
                filter === 'completed' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              Completed
            </button>
          </div>
          
          <button
            onClick={clearCompleted}
            className="text-xs text-muted-foreground hover:text-foreground"
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </div>
      )}
      
      <ul className="space-y-2">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-card transition-all"
            >
              {editingId === todo.id ? (
                <div className="flex flex-1 items-center">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    autoFocus
                  />
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={saveEdit}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                      title="Save"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center flex-1">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                      title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {todo.completed && <Check size={12} />}
                    </button>
                    <span className={`text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.text}
                    </span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                      disabled={todo.completed}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="text-center p-4 text-muted-foreground text-sm">
            {todos.length === 0
              ? 'No tasks yet. Add one above!'
              : filter === 'active'
              ? 'No active tasks'
              : 'No completed tasks'}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoListSolution;
