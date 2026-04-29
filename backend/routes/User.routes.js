const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const { getUsers, getUser } = require('../controllers/User');

router.get("/", authMiddleware, adminMiddleware, getUsers)
router.get("/user/:id", authMiddleware, getUser);

module.exports = router;