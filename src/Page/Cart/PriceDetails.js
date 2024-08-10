import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

export default function PriceDetails({ cart, setCart }) {
  console.log("PriceDetails-->", cart, setCart);
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "sm",
          margin: "auto",
          padding: 2,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: "#fff",
          height: "auto", // Adjust height as needed
        }}
      >
        <Typography sx={{ textAlign: "center", p: 1, fontWeight: 600 }}>
          Price Details
        </Typography>
        <Divider />
        <Box sx={{ py: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography>Price (items)</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography>- ₹8,950</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography>Discount</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#388e3c" }}>- ₹4,947</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography>Coupons for you</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#388e3c" }}>- ₹30</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography>Delivery Charges</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#388e3c" }}>Free</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold" }}>Total Amount</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontWeight: "bold" }}>₹1,047</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ fontWeight: "500", color: "#388e3c" }}>
            You will save ₹4,950 on this order
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex" }}>
        <VerifiedUserOutlinedIcon />
        <Typography sx={{ fontSize: "small", fontWeight: "bold" }}>
          Safe and Secure Payments.Easy returns.100% Authentic products.
        </Typography>
      </Box>
    </Box>
  );
}
