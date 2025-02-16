const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String },
  farmerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }, // Stock should be > 0 to display
  category: { type: String, required: true },
  manufacturedDate: { type: Date, required: true },
  images: [{ type: String }], 
  soldCount: { type: Number, default: 0 } 
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
