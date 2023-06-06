import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import Header from '../component/Header'
import useCustomSelector from '../hooks/useCustomSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { authenticate } from '../redux/reducers/usersReducer'

const ProfilePage = () => {
  const { currentUser, isLoggedIn } = useCustomSelector((state) => state.usersReducer)
  const handleUpdateProfile = () => {

  }
  if (!currentUser) {
    return (
      <div>
        <Header />
        <Typography variant="body1" justifyContent="center">
          Please login to view your profile.
        </Typography>
        <Link to="/login">Login</Link>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={4}
      >
        <Typography variant="h4" component="h4" textAlign="center" marginBottom={2}>
          Welcome, {currentUser.name}
        </Typography>
        <Box
          width={200}
          height={200}
          borderRadius="50%"
          overflow="hidden"
          marginBottom={2}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Typography variant="h6" component="h6" textAlign="center" marginBottom={1}>
          Email: {currentUser.email}
        </Typography>
        <Typography variant="h6" component="h6" textAlign="center" marginBottom={1}>
          Role: {currentUser.role}
        </Typography>
        <Button variant="contained" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Box>
    </div>
  )
}

export default ProfilePage