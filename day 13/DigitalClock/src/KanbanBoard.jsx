import { useState } from "react";

const Status = ["Todo", "InProgress", "InReview", "Completed"];
export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [taskStatus, setTaskStatus] = useState("Todo");
    console.log(taskInput, taskStatus);
    console.log(tasks)

    const addTaskHandler = () => {
        if (taskInput.length > 0) {
            setTasks([
                ...tasks,
                {
                    title: taskInput,
                    taskStatus,
                },
            ]);
            setTaskInput("");
            setTaskStatus("Todo");
        }
    };

    const changeTaskStatus = (index, newStatus) => {
        const updatedTask = tasks.map((task, i) =>
            i === index ? { ...task, taskStatus: newStatus } : task
        );

        setTasks(updatedTask);
    }
    return (
        <div className="p-4">
            <div className="max-w-fit mx-auto">
                <input type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
                <select name="" onChange={(e) => setTaskStatus(e.target.value)}>
                    {Status.map((status, index) => (
                        <option value={status} key={index}>
                            {status}
                        </option>
                    ))}
                </select>
                <button onClick={addTaskHandler} className="ml-2 p-2 bg-blue-500 text-white rounded-md">Add</button>
            </div>
            <div className="w-full grid grid-cols-4 mt-4 gap-3">
                {Status.map((item, index) => (
                    <div>
                        <h1 className="text-center text-xl rounded-md bg-stone-700 p-4" key={index}>{item}</h1>
                        {tasks.filter((task) => task.taskStatus === item)
                            .map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center justify-between">
                                    <p>{task.title}</p>
                                    <select name="" value={task.taskStatus} className="border bg-gray-500" onChange={(e) =>
                                        changeTaskStatus(taskIndex, e.target.value)
                                    }>
                                        {Status.map((status, index) => (
                                            <option value={status} key={index}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
