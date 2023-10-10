import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useCustomSelector from "../hooks/useCustomSelector";
import {
  deleteCartegory,
  fetchAllCartegories,
} from "../redux/reducers/cartegoriesReducer";
import Header from "./Header";
import {
    Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories, loading, error } = useCustomSelector(
    (state) => state.cartegoriesReducer
  );
  const currentUser = useCustomSelector(
    (state) => state.usersReducer.currentUser
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCartegories());
  }, [dispatch]);
  
  const handleDelete = (categoryId: number) => {
    dispatch(deleteCartegory(categoryId));
  };
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            paddingTop: "2.5em",
            paddingBottom: "1.0em",
            textAlign: "center",
          }}
        >
          All Categories
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {categories.map((category) => (
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
                      <IconButton onClick={() => handleDelete(category.id)}>
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
    </div>
  );
};

export default Categories;
