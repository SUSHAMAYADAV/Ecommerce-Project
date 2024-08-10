import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetails";
import Jwtaxios from "../../Service/Jwtaxios";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "../../Component/Loader";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  async function getCart() {
    try {
      const res = await Jwtaxios.get("/get-cart");
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching cart:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getCart();
  }, []);
  if (loading) return <Loader />;
  if (!data?.length)
    return (
      <Box sx={{ m: 4 }}>
        <Box sx={{ boxShadow: 3, p: 3 }}>
          <Typography sx={{ textAlign: "center", fontWeight: "600" }}>
            Your cart is empty
          </Typography>
        </Box>
      </Box>
    );
  return (
    <Box>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item sm={6} md={6} sx={{ boxShadow: 3, m: 1, mt: 3 }}>
          <CartItem cart={data} setCart={setData} />
        </Grid>
        <Grid item sm={4} md={4} sx={{mt:3}}>
          <PriceDetails cart={data} setCart={setData}/>
        </Grid>
      </Grid>
    </Box>
  );
}
