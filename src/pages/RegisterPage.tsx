import React, { useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material'
import { useForm } from "react-hook-form"

import CustomBtn from '../styles/component/CustomBtn'
import Header from './Header'
import useCustomSelector from '../hooks/useCustomSelector'
import { useFormAction } from 'react-router-dom'

const RegisterPage = () => {
    const [customError, setCustomError] = useState(null)
    const { users, loading, error } = useCustomSelector((state) => state.usersReducer)
    const { register, handleSubmit } = useForm()

    // const handleSubmit = (userData) => {
    //     if (userData.)
    // }
    return (
        <div>
            <Header />
            <main>
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        maxWidth: "100%",
                    }}
                    
                >
                    <TextField
                        fullWidth
                        required
                        label="Name"
                        id="fullWidth"
                        margin="normal"
                        {...register("name")}
                    />
                    <TextField
                        fullWidth
                        required
                        label="E-mail"
                        id="fullWidth"
                        margin="normal"
                        className='input'
                        {...register("email")}
                    // value={user?.name || ''}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        id="fullWidth"
                        margin="normal"
                        {...register("password")}
                    // value={user?.email || ''}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Password"
                        id="fullWidth"
                        margin="normal"
                    // value={user?.email || ''}
                    />
                    <CustomBtn type="submit">Register</CustomBtn>
                </Box>
            </main>
        </div>
    )
}

export default RegisterPage
