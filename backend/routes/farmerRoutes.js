const express = require("express");
const router = express.Router();

router.post("/register", handleFarmerSignUp);
router.post("/login", handleFarmerLogin);
router.get("/profile", getFarmerProfile);
router.put("/profile", updateFarmerProfile);
router.post("/products", addProduct);
router.get("/products", getFarmerProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/orders", getFarmerOrders);
router.put("/order/:id/status", updateOrderStatus);
router.get("/allfarmers", getAllFarmers);


module.exports = router;
