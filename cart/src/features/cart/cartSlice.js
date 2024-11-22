import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[]
}
console.log(initialState.cart)
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart : (state, action) =>{
            const newItem = action.payload.product
            state.cart.push(newItem);
            
        },

        deleteFromCart : (state, action) =>{
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        }
    }
})

export const {addToCart, deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;