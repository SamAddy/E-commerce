import { useEffect, useState } from "react"
import { Button, MenuItem, Select, TextField } from "@mui/material"

import { CreateProduct } from "../type/Product"
import useCustomSelector from "../hooks/useCustomSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { fetchAllCartegories } from "../redux/reducers/cartegoriesReducer"
import { Category } from "../type/Category"
import { addNewProduct } from "../redux/reducers/productsReducer"

const AddProduct = () => {
  const [product, setProduct] = useState<CreateProduct>({
    title: "",
    price: 0,
    description: "",
    categoryId: 1,
    images: [],
  }) 

  const [file, setFile] = useState<File | null>(null) 
  const [productCategories, setProductCategories] = useState<Category[]>([]) 

  const categories = useCustomSelector(
    (state) => state.cartegoriesReducer.categories
  ) 
  const dispatch = useAppDispatch() 

  const [titleError, setTitleError] = useState("") 
  const [priceError, setPriceError] = useState("") 
  const [descriptionError, setDescriptionError] = useState("") 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0] 
    setFile(selectedFile) 
  } 

  const handleCreateProduct = () => {
    if (!validateForm()) {
      return 
    }

    const updatedProduct = {
      ...product,
      images: [],
    } 

    dispatch(addNewProduct({ file, product: updatedProduct })) 

    setProduct({
      title: "",
      price: 0,
      description: "",
      categoryId: 1,
      images: [],
    }) 
    setFile(null)
  }

  const handleInputChange =
    (field: keyof CreateProduct) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [field]: event.target.value,
      })) 
    } 

  const validateForm = () => {
    let isValid = true 

    if (!product.title) {
      setTitleError("Title is required") 
      isValid = false 
    } else {
      setTitleError("") 
    }

    if (!product.price || isNaN(product.price) || product.price <= 0) {
      setPriceError("Price must be a positive number") 
      isValid = false 
    } else {
      setPriceError("") 
    }

    if (!product.description) {
      setDescriptionError("Description is required") 
      isValid = false 
    } else {
      setDescriptionError("") 
    }

    return isValid 
  } 

  useEffect(() => {
    dispatch(fetchAllCartegories()).then(() => {
      setProductCategories(categories) 
    }) 
  }, [dispatch, productCategories]) 
  return (
    <div>
      <TextField
        label="Title"
        value={product.title}
        onChange={handleInputChange("title")}
        error={!!titleError}
        helperText={titleError}
      />
      <TextField
        label="Price"
        value={product.price}
        type="number"
        onChange={handleInputChange("price")}
        error={!!priceError}
        helperText={priceError}
      />
      <TextField
        label="Description"
        value={product.description}
        onChange={handleInputChange("description")}
        error={!!descriptionError}
        helperText={descriptionError}
      />
      <TextField
        select
        label="Category"
        value={product.categoryId}
        onChange={handleInputChange("categoryId")}
        sx={{
          width: "300px",
          paddingRight: "10px",
        }}
      >
        {productCategories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleCreateProduct}>
        Create Product
      </Button>
    </div>
  ) 
} 

export default AddProduct 
