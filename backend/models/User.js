const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phNumber: { type: String, required: true, unique: true },
		address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
	},
	{ timestamps: true }
);

const farmerSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phNumber: { type: String, required: true, unique: true },
		kccId: { type: String, required: true, unique: true }, // Unique government ID for farmers
		dob: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
        approved: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = {
	User,
	Farmer,
};
