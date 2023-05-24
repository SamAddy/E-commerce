import React, { useEffect } from 'react'
import { Box, Input, TextField, Typography } from '@mui/material'

import Header from '../component/Header'
import CustomBtn from '../styles/component/CustomBtn'
import useCustomSelector from '../hooks/useCustomSelector'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { login } from '../redux/reducers/usersReducer'
import store from '../test/shared/store'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const { users, loading, error, currentUser } = useCustomSelector((state) => state.usersReducer)
    const { register, handleSubmit } = useForm<{ email: string; password: string }>()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = (data: { email: string; password: string }) => {
        const { email, password } = data
        store.dispatch(login({ email: email, password: password })).then((user) => {
            console.log(user)
            navigate("/profile")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            <Header />
            <main className="form">
                
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <Typography component="h4" variant="h4">
                    Login
                </Typography>
                    <TextField
                        fullWidth
                        {...register('email', { required: true })}
                        label="E-mail"
                        id="fullWidth"
                        margin="normal"
                        className='input'
                    />
                    <TextField
                        fullWidth
                        {...register('password', { required: true })}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        id="fullWidth"
                        margin="normal"
                    />
                    <CustomBtn type="submit" disabled={loading}>Log In</CustomBtn>
                    <Typography variant="body1" component="body">
                    Don't have an account? 
                    <Link to="/register">Register</Link>
                </Typography>
                </Box>
            </main>
        </div>
    )
}

export default LoginPage