import React, { useState } from 'react'
import { useFetchTodos } from './useFetchTodos';

const Todo = () => {
    const { data, setData, loading } = useFetchTodos('https://jsonplaceholder.typicode.com/todos');
    const [todoInput, setTodoInput] = useState('');

    const addTodoHandler = () => {
        if (todoInput.trim().length === 0) {
            alert('Add Todo');
        } else {
            const newTodo = {
                id: Date.now(), // Generate a unique ID based on the current timestamp
                title: todoInput,
            };
            setData([newTodo, ...data]);
            setTodoInput('');
        }
    }

    // window.addEventListener('keydown', addTodoHandler)

    const sortAtoZ = () => {
        const sortedData = [...data].sort((a, b) =>
            a.title.localeCompare(b.title)
        )
        setData(sortedData);
    }

    const sortZtoA = () => {
        const sortedData = [...data].sort((a, b) =>
            b.title.localeCompare(a.title)
        )
        setData(sortedData);
    }
    return (
        <div>
            {/* todo Input */}
            <div>
                <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
                <button onClick={addTodoHandler}>Add Todo</button>

                <button onClick={sortAtoZ}>sort A-Z</button>
                <button onClick={sortZtoA}>sort Z-A</button>
            </div>

            {/* todo Listing */}
            <ul>
                {data.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Todo