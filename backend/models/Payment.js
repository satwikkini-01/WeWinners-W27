import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
	{
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		amount: { type: Number, required: true },
		status: {
			type: String,
			enum: ["Pending", "Completed", "Failed"],
			default: "Pending",
		},
		transactionId: { type: String },
	},
	{ timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
