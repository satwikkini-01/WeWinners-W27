const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	frequency: {
		type: String,
		enum: ["weekly", "bi-weekly", "monthly", "three-months"],
		required: true,
	},
	startDate: { type: Date, required: true },
	nextDeliveryDate: { type: Date, required: true },
	status: { type: String, enum: ["active", "cancelled"], default: "active" },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;