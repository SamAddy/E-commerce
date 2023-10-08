import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import useCustomSelector from '../hooks/useCustomSelector'
import { fetchProductByCartegory } from '../redux/reducers/cartegoriesReducer'
import store from '../redux/store'
import Header from '../component/Header'
import { sortProductsByNameAsc, sortProductsByNameDesc, sortProductsByPriceAsc, sortProductsByPriceDesc } from '../redux/reducers/productsReducer'

const CategoryProducts = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const products = useCustomSelector((state) => state.cartegoriesReducer.categoryProducts)
  const { loading, error } = useCustomSelector((state) => state.cartegoriesReducer)
  const [selectedSortOption, setSelectedSortOption] = useState("")

  useEffect(() => {
    store.dispatch(fetchProductByCartegory(Number(id)))
    // dispatch(fetchProductByCartegory as any)(Number(id))
  }, [dispatch, id])

  useEffect(() => {
    console.log(selectedSortOption)
    switch (selectedSortOption) {
      case "priceAsc":
        dispatch(sortProductsByPriceAsc())
        break
      case "priceDesc":
        dispatch(sortProductsByPriceDesc())
        break
      case "nameAsc":
        dispatch(sortProductsByNameAsc())
        break
      case "nameDesc":
        dispatch(sortProductsByNameDesc())
        break
      default:
        break
    }
  }, [dispatch, selectedSortOption])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!products) {
    return <div>No products found.</div>
  }

  const sortingOptions = [
    { id: "priceAsc", label: "Price low to high" },
    { id: "priceDesc", label: "Price high to low" },
    { id: "nameAsc", label: "Name A-Z" },
    { id: "nameDesc", label: "Name Z-A" },
  ]

  const handleSortOptionChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedOption = e.target.value as string
    setSelectedSortOption(selectedOption)
  }
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Box
          sx={{
            marginTop: "5rem",
            marginBottom: "20px"
          }}
        >
          <TextField
            id="sort-select"
            select
            label="Sort By"
            value={selectedSortOption}
            onChange={handleSortOptionChange}
            sx={{
              width: "300px",
              paddingRight: "10px"
            }}
          >
            {sortingOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            placeholder="Search by name"
            variant="outlined"
            className="search"
            // value={filter}
            // onChange={onChangeFilter}
            sx={{
              width: "300px",
            }}
          />
        </Box>

        <Grid container spacing={3} className="card-container">
          {products.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="card">
                <IconButton className="shopping-cart">
                  <AddShoppingCart />
                </IconButton>
                <CardActionArea>
                  <Link to={`/product/${product.id}`}>
                    <CardContent>
                      <CardMedia
                        component="img"
                        height="150"
                        image={product.images[0]}
                        alt={product.title}
                      />
                      <Typography variant="h5" component="h5" color="secondary" gutterBottom>
                        {product.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">{product.category.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.price} EUR
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          ))
          }
        </Grid>
      </main>
    </div>
  )
}

export default CategoryProducts