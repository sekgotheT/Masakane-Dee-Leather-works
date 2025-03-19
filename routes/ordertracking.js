// routes/orderTracking.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Order not found' });
  }
});

module.exports = router;
