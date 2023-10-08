import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useCustomSelector from "../hooks/useCustomSelector";
import { login } from "../redux/reducers/usersReducer";
import { UserCredentials } from "../type/User";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Shop Goodies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCredentials>();
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = (data: UserCredentials) => {
    dispatch(login(data))
      .then((action) => {
        const loginResult = action.payload;
        if (loginResult instanceof AxiosError) {
          window.alert("Inorrect data please try again.");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred during login");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "300px",
          padding: "24px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" align="center">
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Log In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            Don't have an account?
            <Link to="/register">Register</Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
};

export default Login;
