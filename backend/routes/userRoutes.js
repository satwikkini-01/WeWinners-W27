const express = require("express");
const router = express.Router();
const { handleUserSignUp } = require("../controllers/userController");
const { handleuserLogin } = require("../controllers/userController");
const { getAllProducts } = require("../controllers/userController");
const { getProductById } = require("../controllers/userController");
const { getUserProfile } = require("../controllers/userController");
const { updateUserProfile } = require("../controllers/userController");
const { getUserOrders } = require("../controllers/userController");
const { addUserOrders } = require("../controllers/userController");

router.post("/register", handleUserSignUp);
router.post("/login", handleuserLogin);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/orders", getUserOrders);
router.put("/orders", updateUserOrders);
router.post("/cart", addToCart);
router.get("/cart", getCart);
// router.delete("/cart/:id", removeFromCart);
router.post("/checkout", checkout);
router.post("/review/:productId", addReview);

module.exports = router;
