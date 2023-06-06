import React, { useState } from "react";
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
import { ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import useCustomSelector from "../hooks/useCustomSelector";
import { logout } from "../redux/reducers/usersReducer";
import ThemeSwitcher from "./ThemeSwitcher";
import useAppDispatch from "../hooks/useAppDispatch";

const pages = ["Products"];
const settings = ["Profile", "Login"];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  )
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const { currentUser, isLoggedIn } = useCustomSelector(
    (state) => state.usersReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useCustomSelector((state) => state.cartReducer.items);
  const getTotalItems = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  const handlCartButton = () => {
    navigate("/cart")
  }
  return (
    <div>
      <ThemeSwitcher />
      <AppBar position="static">
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
            <Box sx={{ display: "flex" }}>
              <Button color="inherit" onClick={handleLogout}>
                {isLoggedIn ? "Logout" : ""}
              </Button>

              <IconButton color="inherit" onClick={handlCartButton}>
                <Badge badgeContent={getTotalItems} color="error">
                  <ShoppingCart color="inherit" />
                </Badge>
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={currentUser?.name}
                    src={`${currentUser?.avatar}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isLoggedIn ? (
                  <>
                    {settings.slice(0, 3).map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          component={Link}
                          to={`/${setting.toLowerCase()}`}
                          color="primary"
                          textAlign="center"
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                    {currentUser?.role === "admin" && (
                      <MenuItem key="dashboard" onClick={handleCloseUserMenu}>
                        <Typography
                          component={Link}
                          to="/adminpage"
                          color="primary"
                          textAlign="center"
                        >
                          Dashboard
                        </Typography>
                      </MenuItem>
                    )}
                  </>
                ) : (
                  settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {setting === "Login" ? (
                        <Typography
                          component={Link}
                          to={isLoggedIn ? "#" : `/${setting.toLowerCase()}`}
                          color={isLoggedIn ? "inherit" : "primary"}
                          textAlign="center"
                        >
                          {setting}
                        </Typography>
                      ) : (
                        <Typography
                          component={Link}
                          to={`/${setting.toLowerCase()}`}
                          color="primary"
                          textAlign="center"
                        >
                          {setting}
                        </Typography>
                      )}
                    </MenuItem>
                  ))
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header
