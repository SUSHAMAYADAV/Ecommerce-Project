import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const deleteToCart = (id) => {
    const res = cart.filter((item) => item._id !== id);
    setCart([...res]);
  };

  const addToCart = (item) => {
    console.log("item", item);
    if (!item || !item._id) {
      console.error("Invalid item", item);
      return; // Exit if item is invalid
    }
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) {
        console.error("Invalid cart state", prevCart);
        return [item];
      }
      const itemIndex = prevCart.findIndex((ele) => ele._id === item._id);
      console.log("itemIndex", itemIndex);
      if (itemIndex !== -1) {
        return prevCart.map((ele, index) =>
          index === itemIndex ? { ...ele, ...item } : ele
        );
      } else {
        console.log("Adding new item", item);
        return [...prevCart, item];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, deleteToCart }}>
      {children}
    </CartContext.Provider>
  );
}
