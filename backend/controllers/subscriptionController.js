const Subscription = require("../models/Subscription");

// Function to calculate the next delivery date based on frequency
const calculateNextDelivery = (startDate, frequency) => {
	const date = new Date(startDate);
	switch (frequency) {
		case "weekly":
			date.setDate(date.getDate() + 7);
			break;
		case "bi-weekly":
			date.setDate(date.getDate() + 14);
			break;
		case "monthly":
			date.setMonth(date.getMonth() + 1);
			break;
		case "three-months":
			date.setMonth(date.getMonth() + 3);
			break;
	}
	return date;
};

// Create Subscription
async function createSubscription(req, res) {
	try {
		const { userId, productId, frequency, startDate } = req.body;

		const nextDeliveryDate = calculateNextDelivery(startDate, frequency);

		const subscription = new Subscription({
			userId,
			productId,
			frequency,
			startDate,
			nextDeliveryDate,
		});

		await subscription.save();
		res
			.status(201)
			.json({ message: "Subscription created successfully", subscription });
	} catch (error) {
		console.error("Error in creating subscription:", error);
		res.status(500).json({ error: "Error creating subscription" });
	}
}

// Update Subscription
async function updateSubscription(req, res) {
	try {
		const { subscriptionId } = req.params;
		const { frequency, startDate } = req.body;

		const nextDeliveryDate = calculateNextDelivery(startDate, frequency);

		const updatedSubscription = await Subscription.findByIdAndUpdate(
			subscriptionId,
			{ frequency, startDate, nextDeliveryDate },
			{ new: true }
		);

		res.json({ message: "Subscription updated", updatedSubscription });
	} catch (error) {
		res.status(500).json({ error: "Error updating subscription" });
	}
}

// Cancel Subscription
async function cancelSubscription(req, res) {
	try {
		const { subscriptionId } = req.params;
		await Subscription.findByIdAndUpdate(subscriptionId, {
			status: "cancelled",
		});
		res.json({ message: "Subscription cancelled successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error cancelling subscription" });
	}
}

// Get all subscriptions for a user
async function getUserSubscriptions(req, res) {
	try {
		const { userId } = req.params;
		const subscriptions = await Subscription.find({
			userId,
			status: "active",
		}).populate("productId");
		res.json(subscriptions);
	} catch (error) {
		res.status(500).json({ error: "Error fetching subscriptions" });
	}
}

// Get all deliveries for a particular date
async function getDeliveriesForDate(req, res) {
	try {
		const { date } = req.params;
		const formattedDate = new Date(date);
		const deliveries = await Subscription.find({
			nextDeliveryDate: formattedDate,
			status: "active",
		}).populate("userId productId");

		res.json(deliveries);
	} catch (error) {
		res.status(500).json({ error: "Error fetching deliveries" });
	}
}

module.exports = {
	createSubscription,
	updateSubscription,
	cancelSubscription,
	getUserSubscriptions,
	getDeliveriesForDate,
};
