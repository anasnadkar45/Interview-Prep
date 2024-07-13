import React from 'react';
import Task from './Task';



function TaskList({ tasks, updateTaskStatus }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
      ))}
    </div>
  );
}

export default TaskList;
