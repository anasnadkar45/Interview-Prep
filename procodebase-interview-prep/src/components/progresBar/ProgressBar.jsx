import React, { useState } from 'react'

const InitialTasks = [
    {
        id: 1,
        title: 'complete homework',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'complete homework',
        isCompleted: false,
    },
    {
        id: 3,
        title: 'complete homework',
        isCompleted: false,
    },
    {
        id: 4,
        title: 'complete homework',
        isCompleted: false,
    },
]

export const ProgressBar = () => {
    const [tasks, setTasks] = useState(InitialTasks);
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;

    const completedPercentage = (completedTasks / totalTasks) * 100;


    const handleTask = (taskId) => {
        setTasks((prevTask) => {
            const existingTask = prevTask.find((task) => task.id === taskId);
            if (existingTask && existingTask.isCompleted === false) {
                return prevTask.map((task) => task.id === taskId ? { ...task, isCompleted: true } : task)
            } else{
                return prevTask.map((task) => task.id === taskId ? { ...task, isCompleted: false } : task)
            }
        })

    }


    return (
        <div style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
            <div style={{
                width: '100%',
                height: '20px',
                border: '1px solid black',
                borderRadius: '5px',
                overflow: 'hidden',
                backgroundColor: '#f3f3f3',
            }}>
                <div
                    style={{
                        width: `${completedPercentage}%`,
                        height: '100%',
                        backgroundColor: '#4caf50',
                        transition: 'width 0.3s ease-in-out',
                    }}
                />
            </div>
            <div>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        {!task.isCompleted ?
                            <button onClick={() => handleTask(task.id)}>Mark As Complete</button> :
                            <button onClick={() => handleTask(task.id)}>Mark As UnComplete</button>
                        }

                    </div>
                ))}
            </div>
        </div>
    )
}
