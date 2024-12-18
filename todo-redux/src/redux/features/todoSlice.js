import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        addTodo: (state, action)=>{
            state.todos.push(action.payload)
        },
        toggleTodo: (state, action) =>{
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if(todo){
                todo.completed = true
            }
        }
    }
})

export const {addTodo, toggleTodo} = todoSlice.actions;

export default todoSlice.reducer