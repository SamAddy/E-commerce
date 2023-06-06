import AddProduct from "../component/AddProduct"
import AddCategory from "../component/AddCategory"
import Header from "../component/Header"
import { Box } from "@mui/material"

const AdminPage = () => {
  return (
    <div>
      <Header />
      <Box my={2}>
        <AddProduct />
      </Box>
      <Box my={2}>
        <AddCategory />
      </Box>
    </div>
  )
}

export default AdminPage
