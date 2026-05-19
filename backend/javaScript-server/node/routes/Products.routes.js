const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProducts, getProduct, createProduct, deleteProduct } = require('../controllers/products.Controllers');

router.route('/').get(authMiddleware, getProducts).post(authMiddleware, createProduct);
router.get('/:id', authMiddleware, getProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;