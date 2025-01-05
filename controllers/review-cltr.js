 const Review = require('../models/review-model')
const Product = require('../models/product-model')
const { validationResult } = require('express-validator')

const reviewCltr = {}

reviewCltr.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { productId, userId, name, rating, comment } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const existingReview = await Review.findOne({ product: productId, user: userId })
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' })
    }

    const review = new Review({ product: productId, user: userId, name, rating, comment })
    await review.save()

    res.status(201).json(review)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

reviewCltr.update = async (req, res) => {
  const { reviewId } = req.params
  const { name, rating, comment } = req.body

  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    review.name = name
    review.rating = rating
    review.comment = comment
    await review.save()

    res.json(review)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

reviewCltr.delete = async (req, res) => {
  const { reviewId } = req.params

  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await review.remove()
    res.json({ message: 'Review deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

reviewCltr.getReviews = async (req, res) => {
  const { productId } = req.params

  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'name')
    res.json(reviews)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

reviewCltr.vote = async (req, res) => {
  const { reviewId, vote } = req.params

  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    if (vote === 'upvote') {
      review.upvotes += 1
    } else if (vote === 'downvote') {
      review.downvotes += 1
    } else {
      return res.status(400).json({ error: 'Invalid vote type' })
    }

    await review.save()
    res.json(review)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

reviewCltr.report = async (req, res) => {
  const { reviewId } = req.params

  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }

    review.reports += 1
    await review.save()

    res.json(review)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = reviewCltr