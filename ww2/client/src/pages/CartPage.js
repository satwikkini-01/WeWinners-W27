import React from "react";

const CartPage = ({ cart, removeFromCart }) => {
  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
