const express = require('express');
const Order = require('../models/Order');
const { authenticateUser } = require('../middleware/authMiddleware'); // Ensure only authenticated users/admins
const mongoose = require('mongoose'); // To validate ObjectId
const router = express.Router();

// Track Order (Only authenticated users or admins should access this route)
router.get('/:orderId', authenticateUser, async (req, res) => {
  const { orderId } = req.params;

  // Validate orderId format
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID format' });
  }

  try {
    const order = await Order.findById(orderId).select('status createdAt updatedAt products totalPrice'); // Select only necessary fields
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json({ order });
  } catch (err) {
    console.error('Error tracking order:', err);
    res.status(500).json({ error: 'Failed to retrieve order', details: err.message });
  }
});

module.exports = router;
