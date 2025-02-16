"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/global.css";

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutItems") || "null");
    if (!data) {
      router.push("/cart");
      return;
    }
    setCheckoutData(data);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return false;
    }
    if (!selectedPayment) {
      alert("Please select a payment method");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate order processing
    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and checkout data
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.filter(item => 
        !checkoutData.items.some(checkoutItem => checkoutItem.id === item.id)
      );
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.removeItem("checkoutItems");

      // Show success message and redirect
      alert("Order placed successfully!");
      router.push("/");
    } catch (error) {
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!checkoutData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="checkout-container">
      <button onClick={() => router.push("/cart")} className="go-back">
        Go Back
      </button>
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul className="checkout-items">
          {checkoutData.items.map((item) => (
            <li key={item.id} className="checkout-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <span>Total Amount:</span>
          <span>₹{checkoutData.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout-form">
        <h3>Delivery Information</h3>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Delivery Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="payment-section">
        <h3>Payment Method</h3>
        <div className="payment-options">
          {["Credit/Debit Card", "UPI", "Net Banking", "Cash on Delivery"].map((method) => (
            <button
              key={method}
              className={`payment-button ${selectedPayment === method ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect(method)}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="place-order-btn"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
