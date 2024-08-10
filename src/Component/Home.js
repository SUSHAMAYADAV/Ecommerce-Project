import React, { useState, useEffect } from "react";
import Jwtaxios from "../Service/Jwtaxios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useCart } from "../Contexts/CartContext";
export default function Home() {
  const [listItem, setListItem] = useState([]);
  const { addToCart } = useCart();
  async function addToCarts(item) {
   // addToCart(item);
    const payload = {
      productId: item._id,
      quantity: 1,
      totalPrice: item.price,
    };
    try {
     const res= await Jwtaxios.post("add-to-cart", payload);
     //console.log('res',res.data.data)
     addToCart(res.data?.data)
    } catch (error) {
      console.error(error);
    }
   // console.log("payload-->", payload);
  }
  // Fetch product data on component mount
  useEffect(() => {
    async function fetchProductList() {
      try {
        const res = await Jwtaxios.get("/get-all-product");
        setListItem(res.data.data);
      } catch (error) {
        console.log("Error fetching product list:", error);
      }
    }
    fetchProductList();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {listItem.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg"
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Rs: {item.price}
                </Typography>
              {/*   <Typography variant="body2" color="text.secondary">
                  {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.rating}
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => addToCarts(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
