const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  review: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  type: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, required: true },
  ratings: { type: [Number], default: [] },
  reviews: [reviewSchema],
});

module.exports = mongoose.model('Product', ProductSchema);
