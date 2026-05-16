const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProducts, getProduct, createProduct } = require('../controllers/products.Controllers');

router.route('/').get(authMiddleware , getProducts).post(authMiddleware, createProduct);
router.get('/:id', authMiddleware , getProduct);

module.exports = router;