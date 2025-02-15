const Farmer = require("../models/User");

async function handleFarmerSignUp(req, res) {
    try {
        const { firstName, lastName, email, phNumber, kccId, dob, username, password, address } = req.body;

        const existingFarmer = await Farmer.findOne({ $or: [{ email }, { username }, { kccId }] });
        if (existingFarmer) {
            return res.status(400).json({ message: "Email, KCC ID, or Username already exists" });
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
            address
        });

        return res.status(201).json({ message: "Farmer registered successfully", farmer: newFarmer });
    } catch (error) {
        console.error("Error in farmer signup:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



async function getAllFarmers(req, res) {
    try {
        const allFarmers = await Farmer.find({}, "username");
        return res.status(200).json({ farmers: allFarmers });
    } catch (error) {
        console.error("Error fetching farmers:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    handleFarmerSignUp,
    getAllFarmers,
}
