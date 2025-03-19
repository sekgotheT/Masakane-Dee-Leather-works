// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: String,
  paymentStatus: String
});

module.exports = mongoose.model('Order', orderSchema);

// routes/order.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { products, totalAmount, user, address } = req.body;
  const newOrder = new Order({ products, totalAmount, user, address, paymentStatus: 'Pending' });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
