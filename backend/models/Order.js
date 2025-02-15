const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
		totalPrice: { type: Number, required: true },
		status: {
			type: String,
			enum: ["Pending", "Shipped", "Delivered"],
			default: "Pending",
		},
		payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
