const Product = require("../models/Product");

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({ name, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProducts, addProduct };
