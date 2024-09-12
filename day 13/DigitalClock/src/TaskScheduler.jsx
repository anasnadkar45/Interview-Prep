import React, { useState } from 'react'

const members = [
    {
        id: 1,
        name: 'anas',
    },
    {
        id: 2,
        name: 'sara',
    },
    {
        id: 3,
        name: 'vedant',
    },
    {
        id: 4,
        name: 'asmer',
    },
    {
        id: 5,
        name: 'baktiyar',
    },
]

const priorities = ['low', 'medium', 'high'];

const TaskScheduler = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [assigny, setAssigny] = useState('anas');
    const [priority, setPriority] = useState('low');

    const AddTaskHandler = () =>{
        if(taskInput.length > 0){
            setTasks([...tasks, {
                title:taskInput,
                assigny: assigny,
                priority: priority
            }]);

            setAssigny('anas');
            setPriority('low');
            setTaskInput('');
        }
    }
    return (
        <div>
            {/* input field to assing a task */}
            <div className='flex gap-3 mt-10'>
                <input type="text" value={taskInput} onChange={(e)=>setTaskInput(e.target.value)}/>
                <select name="member" onChange={(e)=>setAssigny(e.target.value)} className='bg-slate-400'>
                    {members.map((member) => (
                        <option className='bg-slate-400' key={member.id} value={member.name}>{member.name}</option>
                    ))}
                </select>
                <select name="priority" onChange={(e)=>setPriority(e.target.value)} className='bg-slate-400'>
                    {priorities.map((priority,index) => (
                        <option className='bg-slate-400' key={index} value={priority}>{priority}</option>
                    ))}
                </select>
                <button onClick={AddTaskHandler}>Add Task</button>
            </div>

            {/* all the tasks */}

            <div className='grid grid-cols-4 gap-2 mt-5'>
                {tasks.map((task)=>(
                    <div className='flex justify-between gap-2 flex-wrap p-2 border'>
                        <p>{task.title}</p>
                        <p>{task.priority}</p>
                        <p>{task.assigny}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskScheduler