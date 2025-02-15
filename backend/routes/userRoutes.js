const express = require("express");
const router = express.Router();

const { handleuserLogin, handleuserSignUp, getAllProducts, getProductById, getUserProfile, updateUserProfile } = require("../controllers/userController")

router.post("/register", handleuserSignUp);
router.post("/login", handleuserLogin);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
// router.get("/orders", getUserOrders);
// router.put("/orders", updateUserOrders);
// router.post("/cart", addToCart);
// router.get("/cart", getCart);
// // router.delete("/cart/:id", removeFromCart);
// router.post("/checkout", checkout);
// router.post("/review/:productId", addReview);

module.exports = router;
