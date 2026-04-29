const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getService, createService, getServices } = require("../controllers/services.Controllers");

router.route('/services').get(authMiddleware, getServices).post(authMiddleware, createService);
router.get('/services/:serviceId', authMiddleware, getService);

module.exports = router;