
import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Trash, Save, RefreshCw } from 'lucide-react';

// Define the state type
interface AppState {
  counter: number;
  todos: Todo[];
  theme: 'light' | 'dark';
  user: User | null;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface User {
  name: string;
  email: string;
}

// Define action types
type Action =
  | { type: 'INCREMENT'; payload?: number }
  | { type: 'DECREMENT'; payload?: number }
  | { type: 'RESET_COUNTER' }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'CLEAR_TODOS' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' };

// Create the context
interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Define the initial state
const initialState: AppState = {
  counter: 0,
  todos: [],
  theme: 'light',
  user: null,
};

// Create the reducer function
const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + (action.payload || 1),
      };
    
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - (action.payload || 1),
      };
    
    case 'RESET_COUNTER':
      return {
        ...state,
        counter: 0,
      };
    
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    
    case 'CLEAR_TODOS':
      return {
        ...state,
        todos: [],
      };
    
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
      };
    
    default:
      return state;
  }
};

// Create a Provider component
const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store
const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Counter Component
const Counter: React.FC = () => {
  const { state, dispatch } = useStore();
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">Counter</h3>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => dispatch({ type: 'DECREMENT' })}
        >
          <Minus size={16} />
        </Button>
        
        <span className="text-xl font-bold w-16 text-center">{state.counter}</span>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => dispatch({ type: 'INCREMENT' })}
        >
          <Plus size={16} />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={() => dispatch({ type: 'RESET_COUNTER' })}
        >
          <RefreshCw size={16} />
        </Button>
      </div>
    </div>
  );
};

// TodoList Component
const TodoList: React.FC = () => {
  const { state, dispatch } = useStore();
  const [newTodoText, setNewTodoText] = useState('');
  
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodoText });
      setNewTodoText('');
    }
  };
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">Todo List</h3>
      
      <form onSubmit={addTodo} className="flex mb-4">
        <Input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 mr-2"
        />
        <Button type="submit" disabled={!newTodoText.trim()}>
          <Plus size={16} className="mr-1" /> Add
        </Button>
      </form>
      
      <ul className="space-y-2">
        {state.todos.length > 0 ? (
          state.todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  className="mr-2"
                />
                <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                  {todo.text}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
              >
                <Trash size={16} />
              </Button>
            </li>
          ))
        ) : (
          <li className="text-center text-muted-foreground">No todos yet</li>
        )}
      </ul>
      
      {state.todos.length > 0 && (
        <Button
          size="sm"
          variant="outline"
          className="mt-4"
          onClick={() => dispatch({ type: 'CLEAR_TODOS' })}
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useStore();
  
  useEffect(() => {
    // Apply the theme to the body
    document.body.dataset.theme = state.theme;
  }, [state.theme]);
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">Theme</h3>
      <Button
        variant="outline"
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      >
        Toggle Theme (Current: {state.theme})
      </Button>
    </div>
  );
};

// User Profile Component
const UserProfile: React.FC = () => {
  const { state, dispatch } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      dispatch({
        type: 'SET_USER',
        payload: { name, email },
      });
    }
  };
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">User Profile</h3>
      
      {state.user ? (
        <div>
          <p><strong>Name:</strong> {state.user.name}</p>
          <p><strong>Email:</strong> {state.user.email}</p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={() => dispatch({ type: 'CLEAR_USER' })}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <form onSubmit={saveUser} className="space-y-2">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
          </div>
          <Button type="submit" disabled={!name || !email}>
            <Save size={16} className="mr-1" /> Save Profile
          </Button>
        </form>
      )}
    </div>
  );
};

// State Inspector Component
const StateInspector: React.FC = () => {
  const { state } = useStore();
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">State Inspector</h3>
      <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-48">
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};

// Main Component
const StateManagement: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Custom State Management</h2>
      <p className="mb-4 text-muted-foreground">
        A custom Redux-like state management implementation using React's Context and useReducer hook.
      </p>
      
      <StoreProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Counter />
          <ThemeToggle />
          <UserProfile />
          <TodoList />
        </div>
        <StateInspector />
      </StoreProvider>
    </div>
  );
};

export default StateManagement;
