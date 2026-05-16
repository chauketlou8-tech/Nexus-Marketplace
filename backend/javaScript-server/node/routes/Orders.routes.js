const express = require('express');
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const { getOrder, getOrders, createOrder, getAdminOrders } = require("../controllers/orders.Controllers");

router.route("/").get(authMiddleware, getOrders).post(authMiddleware, createOrder);
router.get("/admin", authMiddleware, adminMiddleware, getAdminOrders);
router.get("/:id", authMiddleware, getOrder)

module.exports = router;