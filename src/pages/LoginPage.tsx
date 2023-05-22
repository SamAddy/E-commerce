import React, { useEffect } from 'react'
import Header from './Header'
import { Box, Input, TextField } from '@mui/material'
import CustomBtn from '../styles/component/CustomBtn'
import useCustomSelector from '../hooks/useCustomSelector'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { login } from '../redux/reducers/usersReducer'
import { User, UserCredentials } from '../type/User'
import store from '../test/shared/store'

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
            <main>
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        maxWidth: "100%",
                    }}
                    onSubmit={handleSubmit(handleLogin)}
                >
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
                </Box>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {currentUser && <p>Login successful. Welcome, {currentUser.name}!</p>}
            </main>
        </div>
    )
}

// const LoginPage = () => {
//     const dispatch = useDispatch();
//     const { loading, error } = useCustomSelector((state) => state.usersReducer);
//     const { register, handleSubmit } = useForm();

//     const onSubmit = async (data: UserCredentials) => {
//         const { email, password } = data;
//         login({email, password})
//     }

//     return (
//         <div>
//             <header>
//                 <Header />
//             </header>
//             <main>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <label>Email</label>
//                     <input type="email" {...register('email', { required: true })} />
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         {...register('password', { required: true })}
//                     />
//                     <button type="submit" disabled={loading}>
//                         Login
//                     </button>
//                     {error && <p>{error}</p>}
//                 </form>
//             </main>
//             <Box
//                 component="form">
//                     <TextField />
//             </Box>
//         </div>
//     );
// };


export default LoginPage