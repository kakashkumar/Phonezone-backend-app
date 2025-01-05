const express = require('express')
const router = express.Router()
const { registerUser, authUser, getUserProfile, updateUserProfile } = require('../controllers/user-cltr')
const { protect } = require('../middlewares/auth-middleware')
router.post('/register', registerUser)
router.post('/login', authUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

module.exports = router
