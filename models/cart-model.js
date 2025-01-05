const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }]
});

cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
  })
  
  const Cart = mongoose.model('Cart', cartSchema)
  
  module.exports = Cart