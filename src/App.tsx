import NotFoundPage from './pages/NotFoundPage'
import { StyledEngineProvider } from '@mui/material'
import HomePage from './pages/HomePage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ProductPage from './pages/ProductPage'
import CategoryProducts from './pages/CategoryProducts'
import { ThemeProvider } from './theme/ThemeContext'
import { StyledContainer } from './component/ThemeSwitcher'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import Categories from './component/Categories'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "home/",
      element: <HomePage />
    },
    {
      path: "products/",
      element: <HomePage />
    },
    {
      path: "product/:id",
      element: <ProductPage />
    },
    {
      path: "categories/",
      element: <Categories />
    },
    {
      path: "categories/:id",
      element: <CategoryProducts />
    },
    {
      path: "login/",
      element: <LoginPage />
    },
    {
      path: "register/",
      element: <RegisterPage />
    },
    {
      path: "profile/",
      element: <ProfilePage />
    },
    {
      path: "cart/",
      element: <CartPage />
    },
    {
      path: "adminpage/",
      element: <AdminPage />
    },
  ])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
          <StyledContainer>
            <RouterProvider
              router={router}
            />
          </StyledContainer>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App