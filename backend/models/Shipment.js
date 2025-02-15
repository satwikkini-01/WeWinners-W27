const mongoose = ("mongoose");

const shipmentSchema = mongoose.Schema(
	{
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		trackingNumber: { type: String, unique: true },
		status: {
			type: String,
			enum: ["Pending", "Shipped", "Delivered"],
			default: "Pending",
		},
		estimatedDelivery: { type: Date },
	},
	{ timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
