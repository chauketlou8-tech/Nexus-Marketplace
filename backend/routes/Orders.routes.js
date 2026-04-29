const express = require('express');
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const { getOrder, getOrders, createOrder } = require("../controllers/orders.Controllers");

router.route("/").get(authMiddleware, adminMiddleware, getOrders).post(authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrder)

module.exports = router;