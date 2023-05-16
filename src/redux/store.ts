import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import userReducer from "./reducers/usersReducer";
import cartReducer from "./reducers/cartReducer";


const store = configureStore ({
    reducer: {
        productsReducer,
        userReducer, 
        cartReducer,
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store