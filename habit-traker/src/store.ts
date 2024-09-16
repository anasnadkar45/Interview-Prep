import { configureStore } from '@reduxjs/toolkit'
import habitReducer from './features/habits/habitSlice'
export default configureStore({
    reducer: {
        habit: habitReducer,
    },
})