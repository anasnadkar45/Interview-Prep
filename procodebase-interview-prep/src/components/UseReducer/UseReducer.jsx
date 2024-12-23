import React, { useReducer, useState } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'addTodo': return [...state, { id: Date.now(), title: action.payload, completed: false }]
        case 'deleteTodo': return [...state].filter((item) => item.id !== action.payload)
    }
}
export const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, []);
    const [todoInput, setTodoInput] = useState('');

    const addTodo = () => {
        if (todoInput.trim()) {
            dispatch({ type: 'addTodo', payload: todoInput })
            setTodoInput('')
        }
    }
    return (
        <div>
            <div>
                <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
                <button onClick={addTodo}>Add</button>
            </div>
            <div>
                {state.map((todo) => (
                    <div>
                        <h1>{todo.title}</h1>
                        <button onClick={() => dispatch({ type: 'deleteTodo', payload: todo.id })}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
