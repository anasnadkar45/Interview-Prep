import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.item.id === action.payload.id)

            if(existingItem){
                existingItem.count += 1;
            }else{
                const newItem = {
                    count:1,
                    item: action.payload
                }
                state.cart.push(newItem)
            }
        },
        removeFromCart: (state,action) => {
            state.cart = state.cart.filter(item => item.item.id !== action.payload.item.id)
        },
    }
})

export const { addToCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer
