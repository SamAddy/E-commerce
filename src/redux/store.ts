import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore ({
    reducer: {
        productsReducer,
        usersReducer, 
        cartReducer,
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store