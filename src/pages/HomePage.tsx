import React, { useEffect } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'

import { fetchAllProducts } from "../redux/reducers/productsReducer"
import useAppDispatch from '../hooks/useAppDispatch'
import useCustomSelector from '../hooks/useCustomSelector'
import Header from './Header'
import Footer from './Footer'
import CustomBtn from '../styles/component/CustomBtn'

const HomePage = () => {
  const { products, loading, error } = useCustomSelector(state => state.productsReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])
  return (
    <div>
      <header>
        <Header />
        <Box className="hero"></Box>
      </header>
      <main>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {products.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                  
                  <CardActionArea>
                    <CardContent>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0]}
                        alt={product.title}
                      />
                      <Typography variant="h5" component="h2" gutterBottom>
                        {product.title}
                      </Typography>
                      <Typography variant="body1">{product.description}</Typography>
                      <Typography variant="body2" color="text.secondary">{product.price} EUR</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
            }
          </Grid>
        )
        }
        <CustomBtn>Load More</CustomBtn>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage


