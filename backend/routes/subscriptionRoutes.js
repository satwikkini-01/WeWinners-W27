const express = require("express");
const router = express.Router();

const {
	createSubscription,
	updateSubscription,
	cancelSubscription,
	getUserSubscriptions,
	getDeliveriesForDate,
} = require("../controllers/subscriptionController");

router.post("/subscribe", createSubscription);
router.patch("/update/:subscriptionId", updateSubscription);
router.delete("/cancel/:subscriptionId", cancelSubscription);
router.get("/user/:userId", getUserSubscriptions);
router.get("/deliveries/:date", getDeliveriesForDate);

module.exports = router;
