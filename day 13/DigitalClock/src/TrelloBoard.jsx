import React, { useState } from 'react'

const TrelloBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [taskInput, setTaskInput] = useState('');

    const AddTaskHandler = (e) => {
        let id = Date.now();
        e.preventDefault();
        setTasks([...tasks, {
            id: id,
            taskDetail: taskInput,
            category: 'backlog',
        }]);
        setIsActive(false);
        setTaskInput('');
    };

    const updateTaskCategory = (id, newCategory) => {
        setTasks(tasks.map(task => 
            task.id === id 
            ? { ...task, category: newCategory } 
            : task
        ));
    };

    const addTaskToDoing = (id) => {
        updateTaskCategory(id, 'doing');
    };

    const addTaskToReview = (id) => {
        updateTaskCategory(id, 'review');
    };

    const addTaskToDone = (id) => {
        updateTaskCategory(id, 'done');
    };

    return (
        <div>
            <div className='flex gap-4 justify-center my-4'>
                <h1 className='text-center'>Kanban Board</h1>
                <button onClick={() => setIsActive(true)}>Add Task</button>
            </div>
            {isActive && (
                <div className='fixed inset-0 flex justify-center items-center bg-black/70'>
                    <form onSubmit={AddTaskHandler} className='bg-white p-4 rounded-md w-[50%] space-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="task" className='text-black'>Add Task</label>
                            <textarea 
                                type="text" 
                                name='taskInput' 
                                value={taskInput} 
                                onChange={(e) => setTaskInput(e.target.value)} 
                                required 
                                placeholder='Add a task' 
                            />
                        </div>
                        <div className='space-x-4'>
                            <button type='submit'>Add</button>
                            <button type='button' onClick={() => setIsActive(false)}>Close</button>
                        </div>
                    </form>
                </div>
            )}
            <div className='flex justify-center gap-8'>
                {/* backlog */}
                <div>
                    <h1>Backlog</h1>
                    <div>
                        {tasks.filter(task => task.category === 'backlog').map((task) => (
                            <div key={task.id}>
                                <h1>{task.taskDetail}</h1>
                                <button onClick={() => addTaskToDoing(task.id)}>Doing</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* doing */}
                <div>
                    <h1>Doing</h1>
                    <div>
                        {tasks.filter(task => task.category === 'doing').map((task) => (
                            <div key={task.id}>
                                <h1>{task.taskDetail}</h1>
                                <button onClick={() => addTaskToReview(task.id)}>Review</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* review */}
                <div>
                    <h1>Review</h1>
                    <div>
                        {tasks.filter(task => task.category === 'review').map((task) => (
                            <div key={task.id}>
                                <h1>{task.taskDetail}</h1>
                                <button onClick={() => addTaskToDone(task.id)}>Done</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* done */}
                <div>
                    <h1>Done</h1>
                    <div>
                        {tasks.filter(task => task.category === 'done').map((task) => (
                            <div key={task.id}>
                                <h1>{task.taskDetail}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrelloBoard;
