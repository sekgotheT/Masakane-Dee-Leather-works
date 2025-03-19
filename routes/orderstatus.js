// routes/orderStatus.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.put('/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.status = status;
      await order.save();
      res.status(200).json({ message: 'Order status updated', order });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
