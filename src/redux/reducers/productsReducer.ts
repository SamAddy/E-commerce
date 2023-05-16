import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Product } from "../../type/Product";
import { ErrorValidation } from "../../type/Error";
import { ProductUpdate } from "../../type/ProductUpdate";
import { create } from "domain";

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
                console.log(error)
            }
        }
    }
)

export const updateExistingProduct = createAsyncThunk(
    "updateProduct",
    async (product: ProductUpdate) => {
        try {
            const response = await axios.put<Product[]>(`https://api.escuelajs.co/api/v1/products/${product.id}`, product.update)
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
            return state.map(product => {
                if (product.id === action.payload.id) {
                    return {...product, ...action.payload.update}
                }
                return product
            })
        },
        deleteProduct: (state, action: PayloadAction<Product>) => {
            return state.filter(product => product.id !== action.payload.id)
        }, 
        sortByCategory: (state) => {
        },
        sortByPrice: (state, action: PayloadAction<"asc"|"desc">) => {
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
        build.addCase(addNewProduct.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        build.addCase(updateExistingProduct.fulfilled, (state, action) => {
                const updatedIndex = state.findIndex((product) => product.id === action.payload.id)
                if (updatedIndex !== -1) {
                    state[updatedIndex] = action.payload
                }
        })
    }
})

const productsReducer = productsSlice.reducer
export const { 
    createProduct, 
    updateProductReducer, 
    updateProduct, 
    deleteProduct,
    sortByPrice
} = productsSlice.actions
export default productsReducer