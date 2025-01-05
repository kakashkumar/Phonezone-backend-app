 const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review