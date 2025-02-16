import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Wheat", price: 99, image: "/wheat.jpg", stock: 50 },
  { id: 2, name: "Barley", price: 49, image: "/barley.jpg", stock: 30 },
  { id: 3, name: "Corn", price: 79, image: "/corn.jpg", stock: 0 },
  { id: 4, name: "Rice", price: 119, image: "/rice.jpg", stock: 25 },
];

export default function ProductList({ cart, setCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} cart={cart} setCart={setCart} />
      ))}
    </div>
  );
}
