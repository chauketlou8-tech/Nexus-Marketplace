const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const { getUsers, getUser, logout } = require('../controllers/User');

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.post("/logout/:id", logout);

module.exports = router;