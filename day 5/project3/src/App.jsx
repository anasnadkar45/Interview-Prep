import React, { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, status: 'Todo' };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} />
    </div>
  );
}

export default App;
