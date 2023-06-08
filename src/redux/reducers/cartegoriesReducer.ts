import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { Category, CategoryState, NewCategory } from "../../type/Category"
import { Product } from "../../type/Product"
import { uploadFile } from "./productsReducer"

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: "",
    categoryProducts: []
}

const BASE_URL = 'https://api.escuelajs.co/api/v1'

export const fetchAllCartegories = createAsyncThunk(
    "cartegories",
    async () => {
        try {
            const response = await axios.get<Category[]>(`${BASE_URL}/categories`)
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
            const response = await axios.get<Product[]>(`${BASE_URL}/categories/${cartegoryId}/products`)
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
    async ({ file, category }: { file: File | null; category: NewCategory}) => {
        let imageUrl = ''
        if (file) {
            imageUrl = await uploadFile(file)
        }
        const categoryData: NewCategory = {
            ...category,
            image: file ? `${imageUrl}` : "",
        }
        try {
            const response = await axios.post<Category>(`${BASE_URL}/categories/`, categoryData)
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

export const deleteCartegory = createAsyncThunk(
    "deleteCartegory",
    async (cartegoryId: number) => {
        try {
            const response = await axios.delete(`${BASE_URL}/categories/${cartegoryId}`)
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
                    state.categoryProducts = action.payload 
                }
            })
            .addCase(fetchProductByCartegory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.toString() || 'unknown error'
            })
            .addCase(addNewCartegory.pending, (state) => {
                state.loading = true
            })
            .addCase(addNewCartegory.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload == "string") {
                    state.error = action.payload
                }
                else {
                    state.categories.push(action.payload)
                }
            })
            .addCase(addNewCartegory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(deleteCartegory.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCartegory.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                }
                else {
                    const categoryId = action.meta.arg
                    state.categories = state.categories.filter((category) => category.id !== categoryId)
                }
            })
            .addCase(deleteCartegory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

const cartegoriesReducer = cartegoriesSlice.reducer
const { cleanUpCartReducer } = cartegoriesSlice.actions
export default cartegoriesReducer