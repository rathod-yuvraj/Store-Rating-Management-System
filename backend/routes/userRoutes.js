const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const userController = require("../controllers/userController");

router.use(
    verifyToken,
    authorizeRoles("USER")
);

router.get("/stores", userController.getStores);

router.get("/dashboard", userController.getDashboard);

router.get("/profile", userController.getProfile);

router.post("/ratings", userController.submitRating);

router.put("/ratings/:storeId", userController.updateRating);

module.exports = router;