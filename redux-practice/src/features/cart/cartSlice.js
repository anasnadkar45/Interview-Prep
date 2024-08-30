import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart:[],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const item = {
                
            }
        },
        removeFromCart:()=>{},
    }
})
