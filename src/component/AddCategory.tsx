import { Box, Button, TextField } from "@mui/material"   
import { useState } from "react"   
import { NewCategory } from "../type/Category"   
import useAppDispatch from "../hooks/useAppDispatch"   
import { addNewCartegory } from "../redux/reducers/cartegoriesReducer"   

const AddCategory = () => {
  const [category, setCategory] = useState<NewCategory>({
    name: "",
    image: "",
  })   
  const [file, setFile] = useState<File | null>(null)   
  const dispatch = useAppDispatch()   
  const [nameError, setNameError] = useState("")   

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]   
    setFile(selectedFile)   
  }   

  const handleCreateCategory = () => {
    if (!validateForm()) {
        return 
      }
    const newCategory = {
      ...category,
      image: "",
    }

    dispatch(addNewCartegory({ file, category: newCategory }))
    setCategory({ name: '', image: '' });
    setFile(null)
  }
  const handleInputChange =
    (field: keyof NewCategory) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategory((prevCategory) => ({
        ...prevCategory,
        [field]: event.target.value,
      }))
    }
    const validateForm = () => {
        let isValid = true

        if (!category.name) {
            setNameError("Category name is required")
            isValid = false
        }
        else {
            setNameError("")
        }
        return isValid
    }
  return (
    <div>
      <Box display="flex" alignItems="center">
        <TextField
          label="Category Name"
          margin="normal"
          value={category.name}
          onChange={handleInputChange("name")}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          type="file"
          margin="normal"
          onChange={handleFileChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCategory}
        >
          Create Category
        </Button>
      </Box>
    </div>
  )   
}   

export default AddCategory   
