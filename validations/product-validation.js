const product = require('../models/product-model')
const {checkSchema} = require('express-validator')
const productValidationSchema = checkSchema( {
  // user: {
  //   exists: {
  //     errorMessage: 'User ID is required'
  //   },
  //   notEmpty: {
  //     errorMessage: 'User ID cannot be empty'
  //   },
  //   isMongoId: {
  //     errorMessage: 'User ID should be a valid MongoDB ObjectId'
  //   },
  //   custom: {
  //     options: async function(value) {
  //       const user = await user.findById(value)
  //       if (!user) {
  //         throw new Error('User does not exist')
  //       } else {
  //         return true
  //       }
  //     }
  //   }
  // },
  name: {
    exists: {
      errorMessage: 'Product name is required'
    },
    notEmpty: {
      errorMessage: 'Product name cannot be empty'
    },
    trim: true
  },
  image: {
    exists:{
      errorMessage:'Image URL is required'
    },
    notEmpty:{
      errorMessage:'Image URL cannot be empty'
    }
  },

  brand: {
    exists:{
      errorMessage:'Brand is required'
    },
    notEmpty:{
      errorMessage:'Brand cannot be empty'
    }
  },
  category: {
    exists:{
      errorMessage:'Category is required'
    },
    notEmpty:{
      errorMessage:'Category cannot be empty'
    }
  },
  description: {
    exists:{
      errorMessage:'Description is required'
    },
    notEmpty:{
      errorMessage:'Description cannot be empty'
    }
  },
  reviews: {
    optional: true,
    isArray: {
      errorMessage: 'Reviews should be an array'
    }
  },
  rating: {
    optional: true,
    isFloat: {
      options: { min: 0, max: 5 },
      errorMessage: 'Rating should be between 0 and 5'
    }
  },
  numReviews: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Number of reviews should be a non-negative integer'
    }
  },
  countInStock: {
    exists: {
      errorMessage: 'Count in stock is required'
    },
    notEmpty: {
      errorMessage: 'Count in stock cannot be empty'
    },
    isInt: {
      options: { min: 0 },
      errorMessage: 'Count in stock should be a non-negative integer'
    }
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

module.exports = productValidationSchema