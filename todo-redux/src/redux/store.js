import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './features/todoSlice'
import cartReducer from './features/cartSlice'
const store = configureStore({
    reducer: {
        todos: todoReducer,
        cart: cartReducer,
    }
})

export default store;