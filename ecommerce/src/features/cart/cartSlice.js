import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: [],
}

export const cartSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.product.id === action.payload.id)
        },

        removeFromCart: (state, action) => {

        }
    }
})

export const { addToCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer