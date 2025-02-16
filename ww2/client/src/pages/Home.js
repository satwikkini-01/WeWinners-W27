import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/styles.css";

const products = [
  { id: 1, name: "Fresh Apples", price: 3.99, image: "/images/apples.jpg" },
  { id: 2, name: "Organic Carrots", price: 2.49, image: "/images/carrots.jpg" },
  { id: 3, name: "Farm Fresh Eggs", price: 5.99, image: "/images/eggs.jpg" },
  { id: 4, name: "Milk - 1 Gallon", price: 4.79, image: "/images/milk.jpg" },
];

const Home = ({ addToCart }) => {
  return (
    <div className="home-container">
      <h1>Available Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
