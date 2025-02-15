const bcrypt = require("bcrypt");
const { Farmer } = require("../models/User");

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
	const { username, password } = req.body;
	const farmer = await Farmer.findOne({ username, password });
	if (!farmer) {
		return res.status(401).json({ message: "Invalid username or password" });
	}
	return res.status(201).json({ message: "Farmer logged in" });
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
        return res.status(500).json({ message: "Error in fetching approved farmers" });
    }
}

async function getNotApprovedFarmers(req, res) {
    try {
        const notApprovedFarmers = await Farmer.find({ approved: false });
        return res.status(200).json({ farmers: notApprovedFarmers });
    } catch (error) {
        console.error("Error fetching not approved farmers:", error);
        return res.status(500).json({ message: "Error in fetching not approved farmers" });
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

        return res.status(200).json({ message: "Farmer approved successfully", farmer });
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
};
