import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface jobState {
    title: string;
    description: string;
}
interface JobSliceState {
    jobs: jobState[];
}

const initialState: JobSliceState = {
    jobs: []
};
export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<jobState>) => {
            state.jobs.push(action.payload);
        }
    }
})

export const { addJob } = jobSlice.actions;
export default jobSlice.reducer;