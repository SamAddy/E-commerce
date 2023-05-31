import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { CartItem, CartState } from "../../type/Cart"

const CART_STORAGE_KEY = "shoppingCart"

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('shoppingCart') || '[]')
}

const cartSlice = createSlice ({
    name: "shoppingCart",
    initialState, 
    reducers: {
        addProductToCart: (state, action: PayloadAction<CartItem>) => {
            const { id, quantity } = action.payload
            const existingItem = state.items.find((item) => item.id === id)
            if (existingItem) {
                existingItem.quantity += quantity
            }
            else {
                state.items.push(action.payload)  
            }
            saveCartToLocalStorage(state.items)
        }, 
        removeProductFromCart: (state, action: PayloadAction<number>) => {
           state.items = state.items.filter(item => item.id !== action.payload)
           saveCartToLocalStorage(state.items)
        },
        updateProductQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
            const { id, quantity } = action.payload
            const item = state.items.find((item) => item.id === id)
            if (item) {
                item.quantity = quantity
                saveCartToLocalStorage(state.items)
            }
        },
        clearCart: (state) => {
            state.items = []
            saveCartToLocalStorage(state.items)
        }
    }
})

const cartReducer = cartSlice.reducer
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
}

export const { addProductToCart, removeProductFromCart, updateProductQuantity, clearCart } = cartSlice.actions
export default cartReducer