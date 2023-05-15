import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Product } from "../../type/Product";
import { ErrorValidation } from "../../type/Error";
import { ProductUpdate } from "../../type/ProductUpdate";

const initialState : Product[] = []

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts", 
    async () => {
        try {
            const response = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products")
            return response.data
        }
        catch(error) {
            if (axios.isAxiosError<ErrorValidation, Record<string, string[]>>(error)) {
                console.log(error.status)
                console.log(error.response)
            }
            else {
                console.log(error)
            }
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        createProduct: (state, action: PayloadAction<Product>) => {
            state.push(action.payload)
        },
        updateProductReducer: (state, action: PayloadAction<Product[]>) => {
            return action.payload
        },
        updateProduct: (state, action: PayloadAction<ProductUpdate>) => {
            // The checks whether the user is an admin only will be made at where
            // the updateAProduct method will be called.
            return state.map(product => {
                if (product.id === action.payload.id) {
                    return {...product, ...action.payload.update}
                }
                return product
            })
        },
        deleteProduct: (state, action: PayloadAction<Product>) => {
            // This feature is also going to be only for admin
            // checks will be made when this method is been called before its been executed.
            return state.filter(product => product.id !== action.payload.id)
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload
            }
        })
    }
})

const productsReducer = productsSlice.reducer
export const { createProduct, updateProductReducer, updateProduct, deleteProduct} = productsSlice.actions
export default productsReducer