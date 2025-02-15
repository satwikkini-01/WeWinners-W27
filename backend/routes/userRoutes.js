const express = require("express");
const router = express.Router();

router.post("/register", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/orders", getUserOrders);
router.post("/cart", addToCart);
router.get("/cart", getCart);
router.delete("/cart/:id", removeFromCart);
router.post("/checkout", checkout);
router.post("/review/:productId", addReview);

module.exports = router;
