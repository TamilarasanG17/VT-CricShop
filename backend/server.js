const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require ('./routes/orderRoutes')
const authRoutes = require ('./routes/authRoutes')
const path = require('path')
const app = express();

app.use(cors());

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cricketShop')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/images',express.static(path.join(__dirname, 'images')));
 app.use(express.static(path.join(__dirname, 'frontend','dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'));   });

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth',authRoutes)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on:${port}`);
});
