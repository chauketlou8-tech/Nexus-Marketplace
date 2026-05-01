const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProducts, getProduct, createProduct } = require('../controllers/products.Controllers');

router.route('/products').get(authMiddleware , getProducts).post(authMiddleware, createProduct);
router.get('/products/:id', authMiddleware , getProduct);

module.exports = router;