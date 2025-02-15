const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectMongoDb } = require("./connectDB");
const userRoutes = require("./routes/userRoutes.js");
const farmerRoutes = require("./routes/farmerRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

dotenv.config();
connectMongoDb(process.env.MONGO_URI).then(() =>
	console.log("MongoDB connected")
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/farmers", farmerRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
	res.send("Backend is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
