const { checkSchema } = require('express-validator')
const Payment = require('../models/payment-model')
const Order = require('../models/order-model');      l

const paymentValidationSchema = checkSchema({
  order: {
    exists: {
      errorMessage: 'Order ID is required'
    },
    notEmpty: {
      errorMessage: 'Order ID cannot be empty'
    },
    isMongoId: {
      errorMessage: 'Order ID should be a valid MongoDB ObjectId'
    },
    custom: {
      options: async (value) => {
        const order = await Order.findById(value)
        if (!order) {
          throw new Error('Order does not exist')
        } else {
          return true
        }
      }
    }
  },
  paymentMethod: {
    exists: {
      errorMessage: 'Payment method is required'
    },
    notEmpty: {
      errorMessage: 'Payment method cannot be empty'
    },
    isString: {
      errorMessage: 'Payment method should be a string'
    },
    isIn: {
      options: [['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery']],
      errorMessage: 'Payment method should be one of Credit Card, PayPal, Bank Transfer, Cash on Delivery'
    },
    trim: true
  },
  paymentResult: {
    optional: true,
    isObject: {
      errorMessage: 'Payment result should be an object'
    },
    custom: {
      options: (value) => {
        if (value) {
          if (typeof value.id !== 'string' || typeof value.status !== 'string' ||
              typeof value.update_time !== 'string' || typeof value.email_address !== 'string') {
            throw new Error('Payment result fields should be of correct types')
          }
        }
        return true
      }
    }
  },
  amount: {
    exists: {
      errorMessage: 'Amount is required'
    },
    notEmpty: {
      errorMessage: 'Amount cannot be empty'
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Amount should be a positive number'
    }
  },
  currency: {
    exists: {
      errorMessage: 'Currency is required'
    },
    notEmpty: {
      errorMessage: 'Currency cannot be empty'
    },
    isString: {
      errorMessage: 'Currency should be a string'
    }
  },
  isPaid: {
    exists: {
      errorMessage: 'Payment status is required'
    },
    notEmpty: {
      errorMessage: 'Payment status cannot be empty'
    },
    isBoolean: {
      errorMessage: 'Payment status should be a boolean'
    }
  },
  paidAt: {
    optional: true,
    isISO8601: {
      errorMessage: 'PaidAt should be a valid ISO 8601 date string'
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

module.exports = paymentValidationSchema