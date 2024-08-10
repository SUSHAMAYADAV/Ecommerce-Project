import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
  CardMedia,
  Button,
  Divider,
  capitalize,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Jwtaxios from "../../Service/Jwtaxios";
import { useCart } from "../../Contexts/CartContext";
export default function CartItem({ cart, setCart }) {
  const { deleteToCart } = useCart();
  console.log("cartItem-->", cart);
  const updateCart = async (payload) => {
    try {
      const update = await Jwtaxios.post("/update-cart", payload);
      let resItem = update.data.data;
      if (update.data.status === 200) {
        const res = cart?.map((item) => {
          return item._id === resItem._id ? resItem : item;
        });
        setCart([...res]);
      }
    } catch (error) {
      console.log("Error updating cart:", error);
    }
  };
  const removeCartItem = async (id) => {
    try {
      const res = await Jwtaxios.delete(`/delete-cart/${id}`);
      console.log("remove-->", res.data.status);
      if (res.data.status === 200) {
        setCart(cart.filter((item, index) => item._id !== id));
        deleteToCart(id);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  const handleIncrement = (id, quantity) => {
    let newQuantity = quantity + 1;
    const payload = { productId: id, quantity: newQuantity };
    updateCart(payload);
  };

  const handleDecrement = (id, quantity) => {
    let newQuantity = quantity - 1;
    const payload = { productId: id, quantity: newQuantity };
    updateCart(payload);
  };
  return (
    <Box>
      <Typography sx={{ textAlign: "center", p: 1, fontWeight: 600 }}>
        Shopping Cart
      </Typography>
      <Divider />
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {cart?.map((item) => (
          <Grid item key={item.id} sx={{ m: 1 }}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item>
                <Card>
                  <CardMedia
                    sx={{ height: "210px", width: "140px" }}
                    component="img"
                    image="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg"
                    alt={item.title}
                  />
                </Card>
              </Grid>
              <Grid item>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" textTransform={"capitalize"}>
                      {item?.productId?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textTransform={"capitalize"}
                    >
                      Description: {item?.productId?.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#212121",
                      }}
                    >
                      ₹ {item?.productId?.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item?.quantity}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <IconButton
                    onClick={() => handleDecrement(item._id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>

                  <Button
                    sx={{ mx: 1, minWidth: "auto" }}
                    variant="outlined"
                    disabled
                  >
                    {item.quantity}
                  </Button>

                  <IconButton
                    onClick={() => handleIncrement(item._id, item.quantity)}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Button>SAVE FOR LATER</Button>
                <Button onClick={() => removeCartItem(item._id)}>REMOVE</Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{display:'flex',justifyContent:'flex-end',mb:3}}>
              <Button
                sx={{
                  backgroundColor: "#fb641b",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,0.2)",
                  p:'10px 25px',
                  minWidth:'250px',
                  cursor:'pointer'

                  
                }}
              >
                PLACE ORDER
              </Button>
            </Box>
            <Divider></Divider>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
