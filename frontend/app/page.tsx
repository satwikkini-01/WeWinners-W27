"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import { ShoppingCart } from "lucide-react";
import "../styles/global.css";

export default function HomePage() {
  const [cart, setCart] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  if (cart === null) {
    return <p>Loading...</p>; // Prevent hydration mismatch
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="cart-icon">
          <button onClick={() => router.push("/cart")}>
            <ShoppingCart className="cart-icon-image" />
          </button>
        </div>
        <ProductList cart={cart} setCart={setCart} />
      </div>
    </>
  );
}
