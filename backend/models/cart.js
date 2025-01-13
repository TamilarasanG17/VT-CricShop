const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  description: {type:String , required:true},
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  imageUrl :{ type:String, required:true}
});

module.exports = mongoose.model('Cart', CartSchema);
