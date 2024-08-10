import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Jwtaxios from "../Service/Jwtaxios";
function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  async function submitLogin() {
    try {
      const res = await Jwtaxios.post("/auth/login", userLogin);
      console.log(res);
     localStorage.setItem("tokens", res.data.token);
    } catch (error) {
      console.log("error message", error);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 450,
          mt: 20,
          boxShadow: 3,
          p: 5,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Login
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={inputHandler}
              name="email"
              value={userLogin.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={inputHandler}
              name="password"
              value={userLogin.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={submitLogin} fullWidth variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Login;
