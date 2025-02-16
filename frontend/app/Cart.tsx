"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/global.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <button onClick={() => router.push("/")} className="go-back">Go Back</button>
        <h2 className="cart-title">Your Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <button onClick={() => router.push("/")} className="go-back">
        Go Back
      </button>
      <h2 className="cart-title">Your Cart</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="total-amount"><strong>Total: ₹{totalAmount.toFixed(2)}</strong></p>

      <button onClick={() => router.push("/checkout")} className="checkout-now">
        Checkout Now
      </button>
    </div>
  );
}
