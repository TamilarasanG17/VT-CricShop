const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    res.json({ status: 'success', data: cartItems });
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch cart items' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });

    const existingCartItem = await Cart.findOne({ productId });
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      const newCartItem = new Cart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        description : product.description
      });
      await newCartItem.save();
    }
    res.json({ status: 'success', message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ status: 'error', message: 'Failed to add product to cart' });
  }
});

module.exports = router;
