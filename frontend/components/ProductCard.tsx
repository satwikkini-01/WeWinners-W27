import { useRouter } from "next/navigation";

export default function ProductCard({ product, cart, setCart }) {
  const router = useRouter();
  const cartItem = cart.find((item) => item.id === product.id);

  const addToCart = () => {
    if (product.stock === 0) {
      alert("Sorry, this item is out of stock!");
      return;
    }
    
    if (cartItem) {
      if (cartItem.quantity >= product.stock) {
        alert("Sorry, we don't have enough stock!");
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = () => {
    if (cartItem.quantity >= product.stock) {
      alert("Sorry, we don't have enough stock!");
      return;
    }
    setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter(item => item.id !== product.id));
    }
  };

  return (
    <div className="product-card" onClick={() => router.push(`/product/${product.id}`)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">₹{product.price.toFixed(2)}</p>
        <p className="stock-status">
          {product.stock === 0 ? (
            <span className="out-of-stock">Out of Stock</span>
          ) : (
            <span className="in-stock">In Stock: {product.stock}</span>
          )}
        </p>
      </div>
      <div className="product-actions">
        {cartItem ? (
          <div className="quantity-selector stylish-quantity">
            <button 
              onClick={(e) => { e.stopPropagation(); decreaseQuantity(); }} 
              className="decrease-btn"
            >
              -
            </button>
            <span className="quantity-text">{cartItem.quantity}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); increaseQuantity(); }} 
              className="increase-btn"
              disabled={cartItem.quantity >= product.stock}
            >
              +
            </button>
          </div>
        ) : (
          product.stock > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(); }} 
              className="add-to-cart stylish-cart-btn"
            >
              Add to Cart
            </button>
          )
        )}
      </div>
    </div>
  );
}
