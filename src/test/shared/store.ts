import { configureStore } from "@reduxjs/toolkit"

import cartReducer from "../../redux/reducers/cartReducer"
import productsReducer from "../../redux/reducers/productsReducer"
import usersReducer from "../../redux/reducers/usersReducer"

const store = configureStore ({
    reducer: {
        productsReducer,
        usersReducer, 
        cartReducer,
    }
})

export default store