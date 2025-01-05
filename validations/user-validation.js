const { check, validationResult } = require('express-validator')
const validateUserRegistration = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]
const validateUserLogin = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

module.exports = {
  validateUserRegistration,
  validateUserLogin,
}
