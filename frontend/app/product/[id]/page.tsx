"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../styles/global.css";

const products = [
  { 
    id: 1, name: "Wheat", price: 99, stock: "In Stock", image: "/wheat.jpg", 
    manufacturer: "Farm Fresh Co.", description: "Fresh Wheat grown organically with no chemicals.",
    details: "Wheat is an important source of carbohydrates and a significant staple food in many parts of the world."
  },
  { 
    id: 2, name: "Barley", price: 49, stock: "In Stock", image: "/barley.jpg", 
    manufacturer: "Green Harvest", description: "Naturally grown barley rich in vitamins and minerals.",
    details: "Barley is a great source of fiber and contains many essential vitamins and minerals."
  },
  { 
    id: 3, name: "Corn", price: 79, stock: "Limited Stock", image: "/corn.jpg", 
    manufacturer: "Cornland Ltd.", description: "Pure and fresh farm-sourced corn.",
    details: "Corn is rich in fiber, vitamins, and minerals, making it a great addition to a balanced diet."
  },
  { 
    id: 4, name: "Rice", price: 119, stock: "Out of Stock", image: "/rice.jpg", 
    manufacturer: "Golden Rice", description: "Nutritious rice.",
    details: "Rice is a staple food in many countries and provides essential carbohydrates for daily energy."
  }
];

const reviews = [
  { user: "John Doe", rating: 5, comment: "Great quality! Highly recommend.", photo: "/review1.jpg", video: "/review1.mp4" },
  { user: "Jane Smith", rating: 4, comment: "Fresh and organic. Worth the price.", photo: "/review2.jpg", video: "" },
  { user: "Mark Lee", rating: 3, comment: "Decent quality, but expected better packaging.", photo: "", video: "/review3.mp4" }
];

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const productData = products.find((p) => p.id === parseInt(params.id));
    setProduct(productData);
    
    // Load cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, [params.id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartItem = cart.find((item) => item.id === product?.id);

  const addToCart = () => {
    if (!cartItem) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = () => {
    setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter(item => item.id !== product.id));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <button onClick={() => router.push("/")} className="go-back">Go Back</button>
      <div className="product-detail-content">
        {/* Left: Product Image */}
        <div className="product-detail-image-container">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>

        {/* Right: Product Info */}
        <div className="product-detail-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">₹{product.price.toFixed(2)}</p>
          <p className={`stock-status ${product.stock === "Out of Stock" ? "out-of-stock" : ""}`}>{product.stock}</p>
          <p><strong>Supplier:</strong> {product.manufacturer}</p>
          <p className="product-description">{product.description}</p>

          {/* Add to Cart Section */}
          {cartItem ? (
            <div className="quantity-selector">
              <button onClick={decreaseQuantity} className="decrease-btn">-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={increaseQuantity} className="increase-btn">+</button>
            </div>
          ) : (
            <button onClick={addToCart} className="add-to-cart">Add to Cart</button>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-description-section">
        <h3>Product Details</h3>
        <p>{product.details}</p>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p className="review-user"><strong>{review.user}</strong></p>
            <p className="review-rating">⭐ {review.rating}/5</p>
            <p className="review-comment">"{review.comment}"</p>
            {review.photo && <img src={review.photo} alt="Review" className="review-photo" />}
            {review.video && <video controls className="review-video"><source src={review.video} type="video/mp4" /></video>}
          </div>
        ))}
      </div>
    </div>
  );
}
