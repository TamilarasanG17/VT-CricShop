const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product'); 
const  Order = require('../models/order')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: 'success', data: products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch products' });
  }
});


router.post('/', async (req, res) => {
  const { name, type, description, rating, price, imageUrl } = req.body;

  try {
    const newProduct = new Product({ name, type, description, rating, price, imageUrl });
    await newProduct.save();
    res.status(201).json({ status: 'success', message: 'Product created successfully', data: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ status: 'error', message: 'Failed to create product' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/:id/rating', async (req, res) => {
  const { rating } = req.body;
  if (rating < 0 || rating > 5 || isNaN(rating)) {
    return res.status(400).json({ message: 'Rating must be between 0 and 5' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.ratings.push(rating);
    await product.save();
    res.status(200).json({ message: 'Rating added successfully' });
  } catch (err) {
    console.error('Error adding rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/reviews', async (req, res) => {
  const { name, rating, review } = req.body;
  if (!name || !rating || !review || rating < 0 || rating > 5 || isNaN(rating)) {
    return res.status(400).json({ message: 'All fields must be filled correctly' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const newReview = { name, rating, review };
    product.reviews.push(newReview);
    await product.save();
    res.status(200).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/orders', async (req, res) => {
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
