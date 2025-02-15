"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BACKEND_URL from "../../../config";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    images: [] as File[],
  });
  const [imageBlocks, setImageBlocks] = useState<number[]>([0, 1]); // Two initial image upload blocks

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImages = [...formData.images];
      newImages[index] = event.target.files[0];
      setFormData({ ...formData, images: newImages });
    }
  };

  const addImageBlock = () => {
    if (imageBlocks.length < 6) {
      setImageBlocks([...imageBlocks, imageBlocks.length]);
    }
  };

  const removeImageBlock = (index: number) => {
    if (imageBlocks.length > 2) {
      setImageBlocks(imageBlocks.filter((_, i) => i !== index));
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formData.images.forEach((image, index) => {
      formDataToSend.append(`image${index}`, image);
    });

    try {
      const response = await fetch(`${BACKEND_URL}/addProduct`, {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        router.push("/farmer-dashboard");
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-green-700">Add Product</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Images</label>
            <div className="grid grid-cols-3 gap-2">
              {imageBlocks.map((index) => (
                <div key={index} className="relative w-24 h-24 border-2 border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`file-input-${index}`}
                    onChange={(event) => handleImageUpload(index, event)}
                  />
                  <label htmlFor={`file-input-${index}`} className="text-gray-500 text-sm cursor-pointer">
                    {formData.images[index] ? <img src={URL.createObjectURL(formData.images[index])} alt="Uploaded" className="w-full h-full object-cover" /> : "+ Add Image"}
                  </label>
                  {imageBlocks.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeImageBlock(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}
            </div>
            {imageBlocks.length < 6 && (
              <button
                type="button"
                onClick={addImageBlock}
                className="mt-2 text-green-600 underline cursor-pointer"
              >
                + Add More Images
              </button>
            )}
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
