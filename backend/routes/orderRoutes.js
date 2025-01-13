const express = require('express');
const Order = require('../models/order.js');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userName, address, phone, paymentMethod, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newOrder = new Order({
      userName,
      address,
      phone,
      paymentMethod,
      productId,
    });

    await newOrder.save();
    res.status(201).json({ status: 'success', message: 'Order created successfully', data: newOrder });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ status: 'error', message: 'Failed to create order' });
  }
});

module.exports = router;
