import { useEffect } from "react"  
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"  
import { Link, useNavigate } from "react-router-dom"  

import Header from "../component/Header"  
import Footer from "../component/Footer"  
import useCustomSelector from "../hooks/useCustomSelector"  
import useAppDispatch from "../hooks/useAppDispatch"  
import { deleteCartegory, fetchAllCartegories } from "../redux/reducers/cartegoriesReducer"  
import { Delete, Edit } from "@mui/icons-material"  

const LandingPage = () => {
  const { categories, loading, error } = useCustomSelector(
    (state) => state.cartegoriesReducer
  )
  const currentUser = useCustomSelector(
    (state) => state.usersReducer.currentUser
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAllCartegories())  
  }, [dispatch])  
  const handleButtonClick = () => {
    navigate("/products")
  }
  const handleDelete = (categoryId: number) => {
    dispatch(deleteCartegory(categoryId))
  }
  const slicedCategory = categories.slice(0, 5);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            className="explore-grid"
          >
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Discover a wide range of high-quality products for all your
                needs.
              </Typography>
              <Button
                variant="contained"
                onClick={handleButtonClick}
                color="primary"
              >
                Explore Products
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                className="hero"
                component="div"
                style={{ backgroundImage: `url(./assets/sales.avif)` }}
              />
            </Grid>
          </Grid>
        </Container>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {slicedCategory.map((category) => (
              <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardActionArea>
                    <Link to={`/categories/${category.id}`}>
                      <CardContent>
                        <CardMedia
                          component="img"
                          height="150"
                          image={category.image}
                          alt={category.name}
                        />
                        <Typography variant="h5" component="h5" gutterBottom>
                          {category.name}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                  {currentUser?.role === "admin" && (
                    <>
                      <IconButton
                        onClick={() => handleDelete(category.id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </main>
      <Footer />
    </div>
  )  
}  

export default LandingPage  
