import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { Category, CategoryState } from "../../type/Category"
import { Product } from "../../type/Product"

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: "",
    categoryProducts: []
}

export const fetchAllCartegories = createAsyncThunk(
    "cartegories",
    async () => {
        try {
            const response = await axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories")
            return response.data
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

export const fetchProductByCartegory = createAsyncThunk(
    "cartegory/products",
    async (cartegoryId: number) => {
        try {
            const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/categories/${cartegoryId}/products`)
            return response.data
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

export const addNewCartegory = createAsyncThunk(
    "createCartegory",
    async (cartegory) => {
        try {
            const response = await axios.post<Category>("https://api.escuelajs.co/api/v1/categories/", cartegory)
            return response.data
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

const cartegoriesSlice = createSlice({
    name: "cartegory",
    initialState,
    reducers: {
        cleanUpCartReducer: (state) => {
            return initialState
        },
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllCartegories.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllCartegories.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.categories = action.payload
                }
            })
            .addCase(fetchAllCartegories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(fetchProductByCartegory.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductByCartegory.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.categoryProducts = action.payload as Product[]
                }
            })
            .addCase(fetchProductByCartegory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.toString() || 'unknown error'
            })
    }
})

const cartegoriesReducer = cartegoriesSlice.reducer
const { cleanUpCartReducer } = cartegoriesSlice.actions
export default cartegoriesReducer