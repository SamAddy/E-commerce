import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";

import { NewUser, User, UserCredentials, UserState, UserUpdate } from "../../type/User";

const initialState : UserState = {
    users: [],
    loading: false,
    error: ""
}

export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => {
        try {
            const response = await axios.get<User[]>("https://api.escuelajs.co/api/v1/users")
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

export const registerUser = createAsyncThunk(
    "register",
    async ({ file , user }: { file: File, user: NewUser }) => {
        try {
            const fileUploadEndpoint = "https://api.escuelajs.co/api/v1/files/upload"
            const createUserEndpoint = "https://api.escuelajs.co/api/v1/users"
            const formData = new FormData()
            formData.append("avatar-", file, file.name)
            const uploadResponse = await axios.post<{ url: string }>(
                fileUploadEndpoint,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }
              )
              const avatar = uploadResponse.data.url
              const newUser = { ...user, avatar }
              const createResponse = await axios.post<User>(
                createUserEndpoint,
                newUser
              )
              return createResponse.data
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

export const createUser = createAsyncThunk(
    "register",
    async (user: NewUser) => {
        try{
            const response = await axios.post<User>("https://api.escuelajs.co/api/v1/users", user)
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

export const authenticate = createAsyncThunk(
    "authenticate",
    async (access_token: string) => {
        try {
            const authentication = await axios.get<User>("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
            return authentication.data
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
export const login = createAsyncThunk(
    "login",
    async ({ email, password }: UserCredentials, { dispatch }) => {
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", { email, password })
            localStorage.setItem("token", response.data.access_token)
            const authentication = await dispatch(authenticate(response.data))
            return authentication.payload as User
        }
        catch(e) {
            const error = e as AxiosError
            if (error.response?.data) {
                return error.response.data
            }
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        cleanUpUsersReducer: (state) => {
           return initialState
        },
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } 
                else {
                    state.users = action.payload
                }
                state.loading = false
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.error = "Error fetching users. Please try again."
                state.loading = false
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.users.push(action.payload)
                }
            })
            .addCase(registerUser.rejected, (state) => {
                state.error = "Error creating a new user. Please try again."
                state.loading = false
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.currentUser = action.payload
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })
    }
})

const usersReducer = usersSlice.reducer
export const { cleanUpUsersReducer } = usersSlice.actions
export default usersReducer