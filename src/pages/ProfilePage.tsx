import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import Header from '../component/Header'
import useCustomSelector from '../hooks/useCustomSelector'

const ProfilePage = () => {
    const { isLoggedIn, currentUser, error, loading } = useCustomSelector((state) => state.usersReducer)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            store.dispatch(authenticate(token))
            console.log(token)
        }
    }, [])
    if (!currentUser) {
        return (
            <div>
                <Header />
                <Typography variant="body1" component="p" justifyContent="center">
                    Please login to view your profile.
                </Typography>
                <Link to="/login">Login</Link>
            </div>
        )
    }
    return (
        <div>
            <Header />
            <Typography variant="h4" component="h4" justifyContent="center">
                Welcome, {currentUser.name}
            </Typography>
        </div>
    )
}

export default ProfilePage