const express = require('express');
const router = express.Router();
const { getNotifications, getNotification, createNotification, readNotification } = require("../controllers/notifications.controllers");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/").get(authMiddleware, getNotifications).post(authMiddleware, adminMiddleware, createNotification).patch(authMiddleware, readNotification);
router.get("/notification/:id", authMiddleware, getNotification);

module.exports = router;