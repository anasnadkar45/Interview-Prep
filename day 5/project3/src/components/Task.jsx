import React from 'react';

function Task({ task, updateTaskStatus }) {
  const statuses = ['Todo', 'In Progress', 'In Review', 'Completed'];

  const handleStatusChange = (event) => {
    updateTaskStatus(task.id, event.target.value);
  };

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <select value={task.status} onChange={handleStatusChange}>
        {statuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Task;
