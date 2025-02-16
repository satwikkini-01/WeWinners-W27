const bcrypt = require("bcrypt");
const { Farmer } = require("../models/User");
const { setUser } = require("../service/farmerAuth");

const Product = require("../models/Product");
const Order = require("../models/Order");

async function getFarmerSales(req, res) {
	try {
		const { farmerId } = req.params;
		const farmerProducts = await Product.find({ farmerId }).select("_id");

		if (!farmerProducts.length) {
			return res
				.status(404)
				.json({ message: "No products found for this farmer" });
		}

		const productIds = farmerProducts.map((product) => product._id);

		const orders = await Order.find({ "items.product": { $in: productIds } });

		let totalSales = 0;
		orders.forEach((order) => {
			order.items.forEach((item) => {
				if (productIds.includes(item.product.toString())) {
					totalSales += item.quantity * item.product.price;
				}
			});
		});

		res.status(200).json({ farmerId, totalSales });
	} catch (error) {
		console.error("Error fetching total sales:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function getFarmerOrdersStats(req, res) {
	try {
		const { farmerId } = req.params;

		// Fetch all products of the farmer
		const farmerProducts = await Product.find({ farmerId }).select("_id");
		if (!farmerProducts.length) {
			return res
				.status(404)
				.json({ message: "No products found for this farmer" });
		}

		const productIds = farmerProducts.map((product) => product._id);

		// Find all orders that contain at least one product from this farmer
		const totalOrders = await Order.countDocuments({
			"items.product": { $in: productIds },
		});
		const pendingOrders = await Order.countDocuments({
			"items.product": { $in: productIds },
			status: "Pending",
		});

		res.status(200).json({ farmerId, totalOrders, pendingOrders });
	} catch (error) {
		console.error("Error fetching order stats:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function handleFarmerSignUp(req, res) {
	try {
		const {
			firstName,
			lastName,
			email,
			phNumber,
			kccId,
			dob,
			username,
			password,
		} = req.body;

		const existingFarmer = await Farmer.findOne({
			$or: [{ email }, { username }, { kccId }],
		});
		if (existingFarmer) {
			return res
				.status(400)
				.json({ message: "Email, KCC ID, or Username already exists" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		const newFarmer = await Farmer.create({
			firstName,
			lastName,
			email,
			phNumber,
			kccId,
			dob,
			username,
			password: hashedPassword,
		});

		return res
			.status(201)
			.json({ message: "Farmer registered successfully", farmer: newFarmer });
	} catch (error) {
		console.error("Error in farmer signup:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

async function handleFarmerLogin(req, res) {
	try {
		const { username, password } = req.body;
		const { error, token, farmer } = await setUser(res, username, password);
		if (error) {
			return res.status(401).json({ message: error });
		}

		return res.status(200).json({
			message: "Farmer logged in successfully",
			token,
			farmer,
			username,
		});
	} catch (error) {
		console.error("Error in farmer login:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

const addProduct = async (req, res) => {
	try {
		console.log("Received body:", req.body); // Debugging
		console.log("Received files:", req.files); // Debugging

		const {
			name,
			description,
			price,
			stock,
			category,
			manufacturedDate,
			farmerId,
		} = req.body;

		// Ensure all required fields are provided
		if (
			!name ||
			!description ||
			!price ||
			!stock ||
			!category ||
			!manufacturedDate ||
			!farmerId
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Process Image Files
		const imageUrls = req.files.map((file) => `uploads/${file.originalname}`);

		const newProduct = new Product({
			name,
			description,
			price,
			stock,
			images: imageUrls,
			category,
			manufacturedDate,
			farmerId,
		});

		await newProduct.save();
		res
			.status(201)
			.json({ message: "Product added successfully", product: newProduct });
	} catch (error) {
		console.error("Error adding product:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
			new: true,
		});

		if (!updatedProduct)
			return res.status(404).json({ message: "Product not found" });

		res.status(200).json({
			message: "Product updated successfully",
			product: updatedProduct,
		});
	} catch (error) {
		console.error("Error updating product:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct)
			return res.status(404).json({ message: "Product not found" });

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error deleting product:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

async function getAllFarmers(req, res) {
	try {
		const allFarmers = await Farmer.find({}, "username");
		return res.status(200).json({ farmers: allFarmers });
	} catch (error) {
		console.error("Error fetching farmers:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

async function getAllFarmersUsername(req, res) {
	try {
		const allFarmers = await Farmer.find({}, "username");
		return res.status(200).json({ farmers: allFarmers });
	} catch (error) {
		console.error("Error fetching farmers:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

async function getApprovedFarmers(req, res) {
	try {
		const approvedFarmers = await Farmer.find({ approved: true });
		return res.status(200).json({ farmers: approvedFarmers });
	} catch (error) {
		console.error("Error fetching approved farmers:", error);
		return res
			.status(500)
			.json({ message: "Error in fetching approved farmers" });
	}
}

async function getNotApprovedFarmers(req, res) {
	try {
		const notApprovedFarmers = await Farmer.find({ approved: false });
		return res.status(200).json({ farmers: notApprovedFarmers });
	} catch (error) {
		console.error("Error fetching not approved farmers:", error);
		return res
			.status(500)
			.json({ message: "Error in fetching not approved farmers" });
	}
}

async function approveFarmer(req, res) {
	try {
		const { username } = req.body; // Admin sends the username to approve

		const farmer = await Farmer.findOne({ username });

		if (!farmer) {
			return res.status(404).json({ message: "Farmer not found" });
		}

		if (farmer.approved) {
			return res.status(400).json({ message: "Farmer is already approved" });
		}

		farmer.approved = true;
		await farmer.save();

		return res
			.status(200)
			.json({ message: "Farmer approved successfully", farmer });
	} catch (error) {
		console.error("Error approving farmer:", error);
		return res.status(500).json({ message: "Error in approving farmer" });
	}
}

module.exports = {
	handleFarmerSignUp,
	getAllFarmersUsername,
	getApprovedFarmers,
	getNotApprovedFarmers,
	approveFarmer,
	handleFarmerLogin,
	getAllFarmers,
	addProduct,
	updateProduct,
	deleteProduct,
	getFarmerSales,
	getFarmerOrdersStats,
};
