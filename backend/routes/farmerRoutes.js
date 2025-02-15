const express = require("express");
const router = express.Router();

const {
	handleFarmerSignUp,
	getAllFarmersUsername,
	getApprovedFarmers,
    getNotApprovedFarmers,
    approveFarmer,
	handleFarmerLogin,
} = require("../controllers/farmerController");

router.post("/register", handleFarmerSignUp);
router.post("/login", handleFarmerLogin);
// router.get("/profile", getFarmerProfile);
// router.put("/profile", updateFarmerProfile);
// router.post("/products", addProduct);
// router.get("/products", getFarmerProducts);
// router.put("/products/:id", updateProduct);
// router.delete("/products/:id", deleteProduct);
// router.get("/orders", getFarmerOrders);
// router.put("/order/:id/status", updateOrderStatus);
router.get("/allfarmersUsername", getAllFarmersUsername);
router.get("/allfarmers", getApprovedFarmers);
router.get("/pendingFarmers", getNotApprovedFarmers);
router.patch("/approveFarmer", approveFarmer);  

module.exports = router;
