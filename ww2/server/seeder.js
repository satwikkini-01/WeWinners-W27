const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();
connectDB();

const sampleProducts = [
  { name: "Fresh Apples", price: 3.99, image: "/images/apples.jpg" },
  { name: "Organic Carrots", price: 2.49, image: "/images/carrots.jpg" },
  { name: "Farm Fresh Eggs", price: 5.99, image: "/images/eggs.jpg" },
  { name: "Milk - 1 Gallon", price: 4.79, image: "/images/milk.jpg" }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();
