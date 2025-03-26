const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/authMiddleware'); // Ensure admin authentication
const router = express.Router();

// Admin can view all products (with pagination & sorting)
router.get('/products', authenticateAdmin, async (req, res) => {
  try {
    let { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    // Convert to numbers & validate
    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.max(1, parseInt(limit, 10) || 10);

    const products = await Product.find()
      .sort({ [sort]: -1 }) // Sort by the given field, default to newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // Optimize for performance

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// Fetching products from the backend
fetch('/api/admin/products')
  .then(response => response.json())
  .then(data => {
    // Render products to the page
    const productList = document.getElementById('productList');
    data.products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      productList.appendChild(productItem);
    });
  })
  .catch(error => console.log(error));

// Admin can view all orders (with filtering & pagination)
router.get('/orders', authenticateAdmin, async (req, res) => {
  try {
    let { page = 1, limit = 10, status } = req.query;

    // Convert to numbers & validate
    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.max(1, parseInt(limit, 10) || 10);

    const filter = status ? { status } : {}; // Filter orders by status if provided

    const orders = await Order.find(filter)
      .populate('user', 'name email') // Only populate necessary fields
      .sort({ createdAt: -1 }) // Sort newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // Optimize performance

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

module.exports = router;
