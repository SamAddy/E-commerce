import React from 'react'
import { Box, Button, Container, Grid, Link, Paper, Typography } from '@mui/material'
import Header from './Header'
import Footer from './Footer'
import { Image } from '@mui/icons-material'

const LandingPage = () => {
  return (
    <div>
      <header>
        <Header />

      </header>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Discover a wide range of high-quality products for all your needs.
              </Typography>
              <Button variant="contained" color="primary">
                Explore Products
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <img src="https://unsplash.com/photos/k6aQzmIbR1s" alt="Anchor trades" />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage