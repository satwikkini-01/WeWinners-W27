const express = require("express");
const router = express.Router();
// const { createSubscription, getUserSubscriptions, cancelSubscription } = require("../controllers/subscriptionController");



router.post("/register", handleuserSignUp);
router.post("/login", handleuserLogin);
router.get("/product", getAllProducts);
router.get("/product/:productId", getProductById);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/orders", getUserOrders);
router.post("/order", createOrder);

// router.put("/order/:id/status", updateOrderStatus);




// router.post("/",  createSubscription); 
// router.get("/",  getUserSubscriptions); 
// router.delete("/:id", cancelSubscription);