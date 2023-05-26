import React, { useEffect, useState } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, MenuItem, Pagination, TextField, Typography } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { fetchAllProducts, sortProductsByNameAsc, sortProductsByNameDesc, sortProductsByPriceAsc, sortProductsByPriceDesc } from "../redux/reducers/productsReducer"
import useAppDispatch from '../hooks/useAppDispatch'
import useCustomSelector from '../hooks/useCustomSelector'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Product } from '../type/Product'
import { fetchAllUsers } from '../redux/reducers/usersReducer'


const PRODUCTS_PER_PAGE = 12

const useDebounce = <T,>(func: (items: T[], filter: string) => T[], items: T[], delay: number = 1000) => {
  const [filteredData, setFilteredData] = useState(items)
  const [filter, setFilter] = useState("")
  useEffect(() => {
      const timer = setTimeout(() => {
          setFilteredData(func(items, filter))
      }, delay)
      return () => {
          clearTimeout(timer)
      }
  }, [filter, func, items, delay])
  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value)
  }
  return { onChangeFilter, filter, filteredData }
}

const filterProducts = (products: Product[], filter: string) => {
  return products.filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()))
}
const HomePage = () => {
  const { loading, error } = useCustomSelector(state => state.productsReducer)
  const products = useCustomSelector((state) => state.productsReducer.products)
  const users = useCustomSelector((state) => state.usersReducer.users)
  const { onChangeFilter, filter, filteredData } = useDebounce<Product>(filterProducts, products)
  const [selectedSortOption, setSelectedSortOption] = useState("")
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)

  const sortingOptions = [
    { id: "priceAsc", label: "Price low to high" },
    { id: "priceDesc", label: "Price high to low" },
    { id: "nameAsc", label: "Name A-Z" },
    { id: "nameDesc", label: "Name Z-A" },
  ]
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])
  useEffect(() => {
    const offset = (page - 1) * PRODUCTS_PER_PAGE
    dispatch(fetchAllProducts({ offset, limit: PRODUCTS_PER_PAGE })).then((result: any ) => {
      // setCount(Math.ceil(result.meta.total / PRODUCTS_PER_PAGE))
      setCount(17)

    })
  }, [dispatch, page])

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

  const handlePageChange = (e: any, value: number) => {
    setPage(value)
  }

  const handleSortOptionChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedOption = e.target.value as string
    setSelectedSortOption(selectedOption)
  }
  return (
    <div>
      <header>
        <Header />
        <Box 
          className="hero"
          component="div"
          style={{ backgroundImage: `url(./assets/open.jpg)` }}
        />
      </header>
      <main>
      <Box 
          sx={{
            marginTop: "20px",
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
          value={filter}
          onChange={onChangeFilter}
          sx={{
            width: "300px",
          }}
        />
        </Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <Grid container spacing={3} className="card-container">
            {filteredData.map(product => (
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
                      <Typography variant="h5" component="h2" color="secondary" gutterBottom>
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
        )
        }
        <Pagination 
          count={count} 
          shape="rounded" 
          color="primary"
          page={page}
          onChange={handlePageChange}
        />      
      </main>
      <Footer />
    </div>
  )
}

export default HomePage


