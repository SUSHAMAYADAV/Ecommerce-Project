import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Jwtaxios from "../../Service/Jwtaxios";

function Addproduct({ onClose, editRow, setEditRow }) {
  const [addproductData, setAddProductData] = useState({
    title: "",
    price: "",
    quantity: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    if (editRow) {
      setAddProductData(editRow);
    } else {
      setAddProductData({
        title: "",
        price: "",
        quantity: "",
        rating: "",
        description: "",
      });
    }
  }, [editRow]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddProductData({ ...addproductData, [name]: value });
  };

  const submitData = async () => {
    try {
      if (editRow) {
        await Jwtaxios.put(
          `/update-product/${addproductData._id}`,
          addproductData
        );
        setEditRow(null);
      } else {
        await Jwtaxios.post("/create-product", addproductData);
      }
      onClose(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
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
          mt: 15,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button sx={{ mb: 3 }} variant="contained">
            Add
          </Button>
          <CloseIcon onClick={() => onClose(false)} />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={inputHandler}
              name="title"
              value={addproductData.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={inputHandler}
              name="price"
              value={addproductData.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              onChange={inputHandler}
              name="quantity"
              value={addproductData.quantity}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              id="outlined-basic"
              label="Rating"
              variant="outlined"
              onChange={inputHandler}
              name="rating"
              value={addproductData.rating}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={inputHandler}
              name="description"
              value={addproductData.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={submitData} fullWidth variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Addproduct;
