import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import cartegoriesReducer from "./reducers/cartegoriesReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

export const rootReducer = combineReducers({
    users: usersReducer,
    products: productsReducer,
    categories: cartegoriesReducer,
    cart: cartReducer,
  });

export type RootState = ReturnType<typeof rootReducer>