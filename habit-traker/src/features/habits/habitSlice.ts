import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Habit {
    name:string;
    frequency:string;
}

interface HabitState {
    habits: Habit[];
}

const initialState: HabitState = {
    habits: [],
};


export const habitSlice = createSlice({
    name:'habit',
    initialState,
    reducers:{
        addHabit: (state, action:PayloadAction<Habit>) =>{
            state.habits.push({
                name:action.payload.name,
                frequency: action.payload.frequency
            })
            console.log(state.habits);
        },

        deleteHabit: (state, action) =>{

        }
    }
})

export const {addHabit,deleteHabit} = habitSlice.actions;

export default habitSlice.reducer;