 const { checkSchema } = require('express-validator');

const orderValidationSchema = {
    user: {
      in: ['body'],
      exists: {
        errorMessage: 'User is required'
      },
      isMongoId: {
        errorMessage: 'User must be a valid Mongo ID'
      }
    },
    'orderItems.product': {
      in: ['body'],
      exists: {
        errorMessage: 'Product is required'
      },
      isMongoId: {
        errorMessage: 'Product must be a valid Mongo ID'
      }
    },
    'orderItems.name': {
      in: ['body'],
      exists: {
        errorMessage: 'Product name is required'
      },
      isString: {
        errorMessage: 'Product name must be a string'
      },
      notEmpty: {
        errorMessage: 'Product name cannot be empty'
      }
    },
    'orderItems.qty': {
      in: ['body'],
      exists: {
        errorMessage: 'Quantity is required'
      },
      isInt: {
        options: { min: 1 },
        errorMessage: 'Quantity must be an integer greater than 0'
      }
    },
    'orderItems.price': {
      in: ['body'],
      exists: {
        errorMessage: 'Price is required'
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: 'Price must be a positive number'
      }
    },
    'orderItems.image': {
      in: ['body'],
      exists: {
        errorMessage: 'Image URL is required'
      },
      isString: {
        errorMessage: 'Image URL must be a string'
      },
      notEmpty: {
        errorMessage: 'Image URL cannot be empty'
      }
    },
    'shippingAddress.address': {
      in: ['body'],
      exists: {
        errorMessage: 'Shipping address is required'
      },
      isString: {
        errorMessage: 'Shipping address must be a string'
      },
      notEmpty: {
        errorMessage: 'Shipping address cannot be empty'
      }
    },
    'shippingAddress.city': {
      in: ['body'],
      exists: {
        errorMessage: 'City is required'
      },
      isString: {
        errorMessage: 'City must be a string'
      },
      notEmpty: {
        errorMessage: 'City cannot be empty'
      }
    },
    'shippingAddress.postalCode': {
      in: ['body'],
      exists: {
        errorMessage: 'Postal code is required'
      },
      isString: {
        errorMessage: 'Postal code must be a string'
      },
      notEmpty: {
        errorMessage: 'Postal code cannot be empty'
      }
    },
    'shippingAddress.country': {
      in: ['body'],
      exists: {
        errorMessage: 'Country is required'
      },
      isString: {
        errorMessage: 'Country must be a string'
      },
      notEmpty: {
        errorMessage: 'Country cannot be empty'
      }
    },
    paymentMethod: {
      in: ['body'],
      exists: {
        errorMessage: 'Payment method is required'
      },
      isString: {
        errorMessage: 'Payment method must be a string'
      },
      notEmpty: {
        errorMessage: 'Payment method cannot be empty'
      }
    },
    taxPrice: {
      in: ['body'],
      exists: {
        errorMessage: 'Tax price is required'
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: 'Tax price must be a positive number'
      }
    },
    shippingPrice: {
      in: ['body'],
      exists: {
        errorMessage: 'Shipping price is required'
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: 'Shipping price must be a positive number'
      }
    },
    totalPrice: {
      in: ['body'],
      exists: {
        errorMessage: 'Total price is required'
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: 'Total price must be a positive number'
      }
    },
    isPaid: {
      in: ['body'],
      isBoolean: {
        errorMessage: 'isPaid must be a boolean'
      },
      optional: true
    },
    paidAt: {
      in: ['body'],
      isISO8601: {
        errorMessage: 'paidAt must be a valid ISO 8601 date'
      },
      optional: true
    },
    isDelivered: {
      in: ['body'],
      isBoolean: {
        errorMessage: 'isDelivered must be a boolean'
      },
      optional: true
    },
    deliveredAt: {
      in: ['body'],
      isISO8601: {
        errorMessage: 'deliveredAt must be a valid ISO 8601 date'
      },
      optional: true
    }
  }
  
  module.exports = orderValidationSchema