const express = require('express');
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/authMiddleware'); // Ensure only admins update status
const router = express.Router();

// Allowed status values
const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

router.put('/:orderId/status', authenticateAdmin, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}` });
    }

    // Update order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order status updated', order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: 'Failed to update order status', details: err.message });
  }
});

module.exports = router;
