"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "@/config";

export default function ProductDetail() {
    const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!productId) return;

    axios
      .get(`${BACKEND_URL}/users/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data)
        setEditedProduct(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  // Handle input changes
  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  // Save edited product
  const handleSave = () => {
    axios.patch(`/api/products/${productId}`, editedProduct)
      .then(() => {
        setProduct(editedProduct); // Update UI
        setEditMode(false);
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  // Discard changes
  const handleDiscard = () => {
    setEditedProduct(product);
    setEditMode(false);
  };

  if (!product) return <p>Loading...</p>;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{editMode ? "Edit Product" : product.name}</h1>
      <div className="relative w-full h-64">
        <img
          src={`http://localhost:7890/${product.images[currentImageIndex]}`}
          alt="Product"
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Previous Button */}
        {product.images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-md"
          >
            ←
          </button>
        )}

        {/* Next Button */}
        {product.images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-md"
          >
            →
          </button>
        )}
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-gray-600">Description</label>
          {editMode ? (
            <input type="text" name="description" value={editedProduct?.description || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          ) : (
            <p className="text-gray-800">{product.description}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600">Price (₹)</label>
          {editMode ? (
            <input type="number" name="price" value={editedProduct?.price || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          ) : (
            <p className="text-gray-800">₹{product.price}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        {editMode ? (
          <div className="flex gap-4">
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
            <button onClick={handleDiscard} className="bg-gray-500 text-white px-4 py-2 rounded">Discard Changes</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        )}
      </div>
    </div>
  );
}
