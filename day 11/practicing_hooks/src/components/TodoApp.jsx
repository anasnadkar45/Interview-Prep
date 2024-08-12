import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/todos');
      console.log('Fetch response data:', response.data); // Debugging log
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (newTodoTitle.trim() === '' || newTodoDescription.trim() === '') return;

    const newTodo = {
      title: newTodoTitle,
      description: newTodoDescription,
    };

    try {
      const response = await axios.post('https://free-ap-south-1.cosmocloud.io/development/api/todos', newTodo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Add response data:', response.data); 
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
