const review = require('../models/review-model')
const { checkSchema } = require('express-validator')

const reviewValidationSchema = checkSchema({
  name: {
    exists: {
      errorMessage: 'Name is required'
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    },
    trim: true,
    isLength: {
      options: { max: 100 },
      errorMessage: 'Name must be less than 100 characters'
    }
  },
  rating: {
    exists: {
      errorMessage: 'Rating is required'
    },
    notEmpty: {
      errorMessage: 'Rating cannot be empty'
    },
    isFloat: {
      options: { min: 0, max: 5 },
      errorMessage: 'Rating must be a number between 0 and 5'
    },
    toFloat: true
  },
  comment: {
    exists: {
      errorMessage: 'Comment is required'
    },
    notEmpty: {
      errorMessage: 'Comment cannot be empty'
    },
    trim: true,
    isLength: {
      options: { max: 1000 },
      errorMessage: 'Comment must be less than 1000 characters'
    }
  },
  user: {
    exists: {
      errorMessage: 'User ID is required'
    },
    notEmpty: {
      errorMessage: 'User ID cannot be empty'
    },
    isMongoId: {
      errorMessage: 'User ID should be a valid MongoDB ObjectId'
    },
    custom: {
      options: async (value) => {
        
        const User = require('../models/user-model')
        const user = await User.findById(value)
        if (!user) {
          throw new Error('User does not exist')
        }
        return true
      }
    }
  }
})

module.exports = reviewValidationSchema