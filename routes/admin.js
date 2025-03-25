// routes/admin.js
const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/authMiddleware'); // Ensure admin authentication
const router = express.Router();

// Admin can view all products (with pagination & sorting)
router.get('/products', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
    const products = await Product.find()
      .sort({ [sort]: -1 }) // Sort by createdAt (default: newest first)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments();
    
    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// Admin can view all orders (with filtering & pagination)
router.get('/orders', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = status ? { status } : {}; // Filter orders by status if provided

    const orders = await Order.find(filter)
      .populate('user')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalOrders = await Order.countDocuments(filter);
    
    res.status(200).json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

module.exports = router;
