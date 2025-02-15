const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
  duration: { type: Number, enum: [1, 3, 6, 9], required: true }, // Subscription duration in months
  deliveryFrequency: { type: Number, enum: [1, 2, 4], required: true }, // 1 = Once a month, 2 = Twice a month, 4 = Weekly
  selectedDates: [{ type: Date, required: true }], // Specific dates for delivery
  status: { type: String, enum: ["active", "paused", "expired"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
