import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Addproduct from "./Addproduct";
import Jwtaxios from "../../Service/Jwtaxios";

function Producttable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await Jwtaxios.get("/get-all-product");
      setData(res.data.data);
    } catch (error) {
      console.log("error message", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await Jwtaxios.delete(`/delete-product/${id}`);
      //setData(data.filter((item) => item._id !== id));
      await getProduct();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditRow(product);
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const headerCellStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  const handleClose = () => {
    setOpen(false);
    getProduct(); // Refresh the product list after closing
  };

  return (
    <div>
      {open && (
        <Addproduct
          open={open}
          onClose={handleClose}
          editRow={editRow}
          setEditRow={setEditRow}
        />
      )}
      {!open && (
        <Box sx={{ m: 9 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
              Details List
            </Typography>
            <Button
              variant="contained"
              sx={{ mb: 4 }}
              onClick={() => setOpen(true)}
            >
              Add Details
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={headerCellStyle}>ID</TableCell>
                  <TableCell sx={headerCellStyle}>Title</TableCell>
                  <TableCell sx={headerCellStyle}>Price</TableCell>
                  <TableCell sx={headerCellStyle}>Quantity</TableCell>
                  <TableCell sx={headerCellStyle}>Rating</TableCell>
                  <TableCell sx={headerCellStyle}>Description</TableCell>
                  <TableCell sx={{ ...headerCellStyle, fontSize: "25px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: "0.5rem" }}>
                          <Button
                            onClick={() => editProduct(item)}
                            variant="contained"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteProduct(item._id)}
                            color="error"
                            variant="outlined"
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </div>
  );
}

export default Producttable;
