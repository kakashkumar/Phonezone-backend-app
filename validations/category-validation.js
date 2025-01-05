const category = require('../models/category-model')
const { checkSchema } = require('express-validator')

const categoryValidationSchema = checkSchema({
  name: {
    exists: {
      errorMessage: 'Category name is required'
    },
    notEmpty: {
      errorMessage: 'Category name cannot be empty'
    },
    trim: true
  },
  description: {
    exists: {
      errorMessage: 'Category description is required'
    },
    notEmpty: {
      errorMessage: 'Category description cannot be empty'
    },
    trim: true
  },
  createdAt: {
    optional: true,
    isISO8601: {
      errorMessage: 'CreatedAt should be a valid ISO 8601 date string'
    }
  },
  updatedAt: {
    optional: true,
    isISO8601: {
      errorMessage: 'UpdatedAt should be a valid ISO 8601 date string'
    }
  }
})

module.exports = categoryValidationSchema