import { Route, Routes } from "react-router";
import Registeruser from "./Component/Registeruser";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Header from "./Component/Header";
import { CartProvider } from "./Contexts/CartContext";
import Cart from "./Page/Cart";
import ProductList from "./Page/ProductList";
function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/register" element={<Registeruser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
