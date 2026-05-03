const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getService, createService, getServices } = require("../controllers/services.Controllers");

router.route('/').get(authMiddleware, getServices).post(authMiddleware, createService);
router.get('/:id', authMiddleware, getService);

module.exports = router;