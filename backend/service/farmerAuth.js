const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Farmer } = require("../models/User");

async function setUser(res, username, password) {
	try {
		const farmer = await Farmer.findOne({ username });
		if (!farmer) {
			return { error: "Invalid username or password" };
		}

		const isPasswordValid = await bcrypt.compare(password, farmer.password);
		if (!isPasswordValid) {
			return { error: "Invalid username or password" };
		}

		const token = jwt.sign(
			{ id: farmer._id, username: farmer.username, role: "farmer" },
			process.env.JWT_SECRET
		);
		
		// Set token in cookie
		res.cookie("token", token);
		return { message: "Login successful", farmer, token };
	} catch (error) {
		console.error("Error in setting user:", error);
		return { error: "Internal Server Error" };
	}
}

function getUser(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		return null;
	}
}

module.exports = { setUser, getUser };
