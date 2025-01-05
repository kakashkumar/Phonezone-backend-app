const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
