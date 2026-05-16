const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { getPayments, getPayment, createPayment } = require("../controllers/payments.controllers");

router.route('/payments').get(authMiddleware, adminMiddleware, getPayments).post(authMiddleware, createPayment);
router.get('/payments/:paymentId', authMiddleware, adminMiddleware, getPayment);

module.exports = router;