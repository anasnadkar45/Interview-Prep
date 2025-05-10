import React, { useState } from 'react'

export const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('')
    const [taskCategory, setTaskCategory] = useState('')

    function AddTask() {
        if (taskName.length > 0 && taskCategory.length > 0) {
            const newTask = {
                id: Date.now(),
                name: taskName,
                category: taskCategory
            }

            setTasks([...tasks, newTask])

            setTaskName('')
            setTaskCategory('')
        } else {
            alert("Enter the valid input")
        }
    }

    function changeCategory(taskId, newCategory) {
        const updatedTask = tasks.map((task) => {
            return task.id === taskId ? { ...task, category: newCategory } : task
        })

        setTasks(updatedTask)
    }
    console.log("tasks", tasks)

    const categories = [...new Set(tasks.map((task) => task.category))]
    return (
        <div>
            <h1>TaskBoard</h1>
            <div>
                <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='task name' />
                <input type="text" value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} placeholder='task category' />
                <button onClick={AddTask}>Add Task</button>
            </div>

            <div>
                {
                    categories.map((category) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul>
                                {tasks.filter((task) => task.category === category)
                                    .map((task) => (
                                        <div>
                                            <li>{task.name}</li>
                                            <select name="category" onChange={(e) => changeCategory(task.id, e.target.value)}>
                                                {categories.map((category) => (
                                                    <option value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
