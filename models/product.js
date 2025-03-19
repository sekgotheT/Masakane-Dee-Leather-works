// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  stock: Number
});

module.exports = mongoose.model('Product', productSchema);

// routes/product.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/upload', async (req, res) => {
  const { name, description, price, imageUrl, category, stock } = req.body;
  const newProduct = new Product({ name, description, price, imageUrl, category, stock });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
