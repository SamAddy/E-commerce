import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../type/Product";
import { ErrorValidation } from "../../type/Error";
import { ProductUpdate } from "../../type/ProductUpdate";

const initialState : {
    products: Product[],
    loading: boolean, 
    error: ""
} = {
    products: [],
    loading: false,
    error: ""
}

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts", 
    async () => {
        try {
            const response = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products")
            return response.data
        }
        catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const addNewProduct = createAsyncThunk(
    "createProduct",
    async (product: Product) => {
        try{
            const response = await axios.post("https://api.escuelajs.co/api/v1/products/", product)
            return response.data
        }
        catch(error) {
            if (axios.isAxiosError<ErrorValidation, Record<string, string[]>>(error)) {
                console.log(error.status)
                console.log(error.response)
                return error
            }
            else {
                return error
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
                return error
            }
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortProductByCategory: (state, action: PayloadAction<"asc"|"desc">) => {
            if (action.payload === "asc") {
                state.products.sort((a, b) => a.category.name.localeCompare(b.category.name))
            }
            else {
                state.products.sort((a, b) => a.category.name.localeCompare(b.category.name))
            }
        },
        sortProductByPrice: (state, action: PayloadAction<"asc"|"desc">) => {
            if (action.payload === "asc") {
                state.products.sort((a,b) => a.price - b.price)
            } 
            else {
                state.products.sort((a,b) => b.price - a.price)
            }  
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.request
                }
                else {
                    state.products = action.payload
                }
                state.loading = false
            })
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                console.error("Error fetching products: ", state.error)
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                console.error("Error adding new product: ", action.error)
            })
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
                const updatedIndex = state.products.findIndex((product) => product.id === action.payload?.id)
                if (updatedIndex !== -1 && action.payload) {
                    state.products[updatedIndex] = action.payload
                }
            })
            .addCase(deleteAProduct.fulfilled, (state, action) => {
            state.products.filter((product) => product.id !== action.payload.id)
        })
    }
})

const productsReducer = productsSlice.reducer
export const { sortProductByPrice, sortProductByCategory } = productsSlice.actions
export default productsReducer