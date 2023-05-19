import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product, ProductState } from "../../type/Product";
import { ProductUpdate } from "../../type/ProductUpdate";
import { CreateProduct } from "../../type/CreateProduct";

const initialState : ProductState = {
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
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

export const addNewProduct = createAsyncThunk(
    "createProduct",
    async (product: CreateProduct) => {
        try{
            const response = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", product)
            return response.data
        }
        catch(e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
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
        catch(e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

export const deleteAProduct = createAsyncThunk(
    "deleteProduct",
    async (productId: number) => {
        try {
            const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
            return response.data
        }
        catch(e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductReducer: (state) => {
            return initialState
        },
        sortProductByCategory: (state, action: PayloadAction<"asc"|"desc">) => {
            state.products.sort((a, b) => {
                if (action.payload === "asc") {
                    return a.category.name.localeCompare(b.category.name)
                }
                else {
                    return b.category.name.localeCompare(a.category.name)
                }
            })
        },
        sortProductByPrice: (state, action: PayloadAction<"asc"|"desc">) => {
            state.products.sort((a, b) => {
                if (action.payload === "asc") {
                    return a.price - b.price
                } 
                else {
                    return b.price - a.price
                }  
            })
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                if ( typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.products = action.payload
                }
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.loading = false
                state.error = "Error fetching products. Please try again later."
            })
            .addCase(addNewProduct.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.products.push(action.payload)
                }   
            })
            .addCase(addNewProduct.rejected, (state) => {
                state.error = "Error adding new product"
                state.loading = false
            })
            .addCase(updateExistingProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } 
                else if ((action.payload as Product).id) {
                    const updatedIndex = state.products.findIndex((product) => product.id === (action.payload as Product).id)
                    if (updatedIndex !== -1) {
                        state.products[updatedIndex] = action.payload as Product
                    }
                }
            })
            .addCase(updateExistingProduct.rejected, (state) => {
                state.error = "Error updating product"
                state.loading = false
            })
            .addCase(deleteAProduct.fulfilled, (state, action) => {
                state.products.filter((product) => product.id !== action.payload.id)
            })
    }
})

const productsReducer = productsSlice.reducer
export const { cleanUpProductReducer, sortProductByPrice, sortProductByCategory } = productsSlice.actions
export default productsReducer