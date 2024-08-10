import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Jwtaxios from "../Service/Jwtaxios";
function Registeruser() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  //console.log("-->", userDetails);
  async function submitDetails() {
    try {
      const res = await Jwtaxios.post("/auth/register", userDetails);
      console.log(res.data);
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
          Create Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              id="outlined-basic"
              label="userName"
              variant="outlined"
              onChange={inputHandler}
              name="name"
              value={userDetails.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={inputHandler}
              name="email"
              value={userDetails.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              id="outlined-basic"
              label="MobileNo"
              variant="outlined"
              onChange={inputHandler}
              name="mobileNo"
              value={userDetails.mobileNo}
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
              value={userDetails.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={submitDetails} fullWidth variant="contained">
              create account
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Registeruser;
