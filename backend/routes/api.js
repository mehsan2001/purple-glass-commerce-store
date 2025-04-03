
const express = require('express');
const router = express.Router();
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const { authenticateUser } = require('../middleware/auth.middleware');

// Public routes
router.use('/products', productRoutes);

// Protected routes (require authentication)
router.use('/orders', authenticateUser, orderRoutes);

module.exports = router;
