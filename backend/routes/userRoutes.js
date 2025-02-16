const express = require("express");
const router = express.Router();

const {
	handleUserSignUp,
	handleuserLogin,
	getAllProducts,
	getProductById,
	getUserProfile,
	updateUserProfile,
	getUserOrders,
	addUserOrders,
	addToCart,
	getCartItems,
	removeFromCart,
	getProductReviews,
	addReview,
} = require("../controllers/userController");

router.post("/register", handleUserSignUp);
router.post("/login", handleuserLogin);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/orders", getUserOrders);
router.post("/orders", addUserOrders);
router.post("/cart", addToCart);
router.get("/cart", getCartItems);
router.delete("/cart/:productId", removeFromCart);
// router.post("/checkout", checkout);
router.post("/review/:productId", addReview);
router.get("/review/:productId", getProductReviews);

module.exports = router;
