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
                console.error(error)
            }
        }
    }
)

export const addNewProduct = createAsyncThunk(
    "createProduct",
    async (product) => {
        try{
            const response = await axios.post("https://api.escuelajs.co/api/v1/products/", product)
            return response.data
        }
        catch(error) {
            if (axios.isAxiosError<ErrorValidation, Record<string, string[]>>(error)) {
                console.log(error.status)
                console.log(error.response)
            }
            else {
                console.error(error)
            }
        }
    }
)

export const updateExistingProduct = createAsyncThunk(
    "updateProduct",
    async (product: ProductUpdate) => {
        try {
            const response = await axios.put<Product>(`https://api.escuelajs.co/api/v1/products/${product.id}`, product)
            return response.data
        }
        catch(error) {
            if (axios.isAxiosError<ErrorValidation, Record<string, string[]>>(error)) {
                console.log(error.status)
                console.log(error.response)
            }
            else {
                console.error(error)
            }
        }
    }
)

export const deleteAProduct = createAsyncThunk(
    "deleteProduct",
    async (product: Product) => {
        try {
            const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${product.id}`)
            return response.data
        }
        catch(error) {
            if (axios.isAxiosError<ErrorValidation, Record<string, string[]>>(error)) {
                console.log(error.status)
                console.log(error.response)
            }
            else {
                console.error(error)
            }
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortProductByCategory: (state, action: PayloadAction<"asc"|"desc">) => {
            if (action.payload = "asc") {
                state.sort((a, b) => a.category.name.localeCompare(b.category.name))
            }
            else {
                state.sort((a, b) => a.category.name.localeCompare(b.category.name))
            }
        },
        sortProductByPrice: (state, action: PayloadAction<"asc"|"desc">) => {
            if (action.payload === "asc") {
                state.sort((a,b) => a.price - b.price)
            } 
            else {
                state.sort((a,b) => b.price - a.price)
            }  
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload
            }
        })
        build.addCase(fetchAllProducts.rejected, (state, action) => {
            console.error("Error fetching products: ", action.error)
        })
        build.addCase(addNewProduct.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        build.addCase(addNewProduct.rejected, (state, action) => {
            console.error("Error adding new product: ", action.error)
        })
        build.addCase(updateExistingProduct.fulfilled, (state, action) => {
            const updatedIndex = state.findIndex((product) => product.id === action.payload?.id)
            if (updatedIndex !== -1 && action.payload) {
                state[updatedIndex] = action.payload
            }
        })
        build.addCase(deleteAProduct.fulfilled, (state, action) => {
            return state.filter(product => product.id !== action.payload.id)
        })
    }
})

const productsReducer = productsSlice.reducer
export const { sortProductByPrice, sortProductByCategory } = productsSlice.actions
export default productsReducer