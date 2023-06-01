import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Box, Typography, Button, IconButton } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'

import { useDispatch } from 'react-redux'
import useCustomSelector from '../hooks/useCustomSelector'
import { fetchSingleProduct } from '../redux/reducers/productsReducer'
import store from '../redux/store'
import Header from '../component/Header'
import { addProductToCart } from '../redux/reducers/cartReducer'

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const singleProduct = useCustomSelector((state) => state.productsReducer.singleProduct)
    const { loading, error } = useCustomSelector((state) => state.productsReducer)
    useEffect(() => {
        if (id) {
            store.dispatch(fetchSingleProduct(Number(id)))
        }
    }, [dispatch, id])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    if (!singleProduct) {
        return <div>No product found.</div>
    }
    const handleAddToCart = (id: number, title: string, price: number, quantity: 1) => {
        dispatch(addProductToCart({ id, title, price, quantity }))
    }
    return (
        <div>
            <Header />
            <div className="product">
                <img src={singleProduct.images[0]} alt={singleProduct.title} className="productImage" />
                <Box p={2} className="product__details">
                    <Typography variant="h2" component="h2">
                        {singleProduct.title}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Price: {singleProduct.price}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Description: {singleProduct.description}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        Category: {singleProduct.category.name}
                    </Typography>
                    <Box p={5}>
                        <Grid container spacing={3} className="product__additional-images">
                            {singleProduct.images.slice(1).map((image) => (
                                <Grid item xs={6} sm={4} md={3} key={image} >
                                    <img src={image} alt={singleProduct.title} className="productImage-secondary" />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Button variant="contained">Buy me</Button>
                    <IconButton
                        onClick={() => handleAddToCart(singleProduct.id, singleProduct.title, singleProduct.price, 1)}
                    >
                        <AddShoppingCart />
                    </IconButton>
                </Box>
            </div>
        </div>
    )
}

export default ProductPage