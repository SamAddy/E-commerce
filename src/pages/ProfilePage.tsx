import React from 'react'
import useCustomSelector from '../hooks/useCustomSelector'
import { Typography } from '@mui/material'
import Header from './Header'

const ProfilePage = () => {
    const { users, isLoggedIn } = useCustomSelector((state) => state.usersReducer)
    
    if (isLoggedIn) {
        return (
            <div>
                <Header />
                <Typography variant="h1" component="h1">Unauthorized :(</Typography>
            </div>
          )
    }
    return (
        <div>
            <Header />
            You are right here in your profile.
        </div>
      )
}

export default ProfilePage