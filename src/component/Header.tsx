import React, { useContext } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode, LightModeSharp, ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import useCustomSelector from "../hooks/useCustomSelector";
import { logout } from "../redux/reducers/usersReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import { ThemeContext } from "../theme/ThemeContext";

const pages = ["Products", "Categories"];

export const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { currentUser, isLoggedIn } = useCustomSelector(
    (state) => state.usersReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useCustomSelector((state) => state.cartReducer.items);
  const getTotalItems = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlCartButton = () => {
    navigate("/cart");
  };

  const handleAdminPage = () => {
    navigate("/adminpage");
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Shop Goodies
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={`/${page.toLowerCase()}`}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Shop Goodies
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <IconButton color="inherit" onClick={handlCartButton}>
              <Badge badgeContent={getTotalItems} color="error">
                <ShoppingCart color="inherit" />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <DarkMode /> : <LightModeSharp /> }
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                {currentUser ? (
                  <>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={currentUser?.name}
                        src={`${currentUser?.avatar}`}
                      />
                    </IconButton>
                    {currentUser.role.toLocaleLowerCase() === "admin" ? (
                      <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleAdminPage}>
                          Admin Dashboard
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    ) : (
                      <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    )}
                  </>
                ) : (
                  <IconButton onClick={handleLogin}>
                    <Avatar />
                  </IconButton>
                )}
              </Tooltip>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
