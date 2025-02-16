import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </div>
  );
}

export default App;
