require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const usersCltr = require('./controllers/user-cltr')
const { checkSchema, validationResult } = require('express-validator')
const userRegisterValidationSchema = require('./validations/user-registration-validations')
const userLoginValidationSchema = require('./validations/user-login-validation')
const authenticateUser = require('./middlewares/authenticateUser')
const authorizeUser = require('./middlewares/authorizeUser')
const productCltr = require('./controllers/product-cltr')
const productValidationSchema = require('./validations/product-validation')
const orderCltr = require('./controllers/order-cltr')
const paymentController = require('./controllers/payment-cltr')
const reviewCltr = require('./controllers/review-cltr')
const categoryCltr = require('./controllers/category-cltr')
const addressCltr = require('./controllers/address-cltr')
const cartCltr = require('./controllers/cart-cltr')
const categoryValidationSchema = require('./validations/category-validation')
const addressValidationSchema = require('./validations/address-validation')
const roleCltr = require('./controllers/role-cltr')
const userHasRolesCltr = require('./controllers/userHasRole-cltr')
connectDB() 

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use(cors())

// application level middleware - using it for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)

app.get('/users/account', authenticateUser, usersCltr.account)
app.get('/users/checkemail', usersCltr.checkEmail)

app.put('/users/updateUser', usersCltr.updateUser)
app.get('/users/userProfile', usersCltr.userProfile)
app.post('/users/forgotPassword', usersCltr.forgotPassword)
app.put('/users/resetPassword', usersCltr.resetPassword)
app.get(`/users/getUsers`, usersCltr.getUsers)

app.get('/products/list', productCltr.list) 
app.get('/api/product/:id', productCltr.show)
app.get('/api/products', productCltr.getProductsById)
app.post('/api/product/create', productValidationSchema, productCltr.create)
app.put('/api/product/update', productCltr.update)
app.get('/api/product/:id/applications/reviews', productCltr.reviews)
app.get('/api/product/:id/applications/reviews/:reviewId', authorizeUser(['user']), productCltr.singleReview)
app.put('/api/product/:id/applications/reviews/:reviewId', authorizeUser(['user']), productCltr.reviewUpdate)

app.post('/api/orders', authenticateUser, orderCltr.create)
app.get('/api/orders/:id', authenticateUser, orderCltr.view)
app.get('/api/orders', authenticateUser, orderCltr.list)
app.put('/api/orders', authenticateUser, orderCltr.update)
app.delete('/api/orders/:id', authenticateUser, orderCltr.cancel)

//app.post('/api/payments/initiate', authenticateUser, paymentController.initiatePayment)
// app.post('/api/payments', authenticateUser, paymentController.create)
// app.post('/api/payments/confirm', authenticateUser, paymentController.confirmPayment)
// app.put('/api/payments/:paymentId/status', authenticateUser, paymentController.updatePaymentStatus)
// app.post('/api/payments/notifications', authenticateUser, paymentController.handlePaymentNotification)
// app.post('/api/payments/methods', authenticateUser, paymentController.savePaymentMethod)
// app.get('/api/payments/:paymentId/fraud', authenticateUser, paymentController.detectFraud)
// app.post('/api/payments/refund', authenticateUser, paymentController.refundPayment)

app.post('/api/reviews', authenticateUser, reviewCltr.create)
app.put('/api/reviews/:reviewId', authenticateUser, reviewCltr.update)
app.delete('/api/reviews/:reviewId', authenticateUser, reviewCltr.delete)
app.get('/api/products/:productId/reviews', reviewCltr.getReviews)
app.post('/api/reviews/:reviewId/vote/:vote', authenticateUser, reviewCltr.vote)
app.post('/apireviews/:reviewId/report', authenticateUser, reviewCltr.report)

app.post('/api/categories', authenticateUser, authorizeUser(['admin']), categoryValidationSchema, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    categoryCltr.create(req, res)
})

app.get('/api/categories', categoryCltr.list)
app.get('/api/categories/:id', categoryCltr.view)
app.put('/api/categories/:id', authenticateUser, authorizeUser(['admin']), categoryValidationSchema, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    categoryCltr.update(req, res)
})
app.delete('/api/categories/:id', authenticateUser, authorizeUser(['admin']), categoryCltr.delete)
app.get('/api/categories/search', categoryCltr.search)
app.get('/api/categories/:id/subcategories', categoryCltr.getSubcategories)

app.get('/api/address', authenticateUser, addressCltr.list)
app.get('/api/address/:id', authenticateUser, addressCltr.show)
app.post('/api/address', authenticateUser, addressValidationSchema, addressCltr.create)
app.put('/api/address/:id', authenticateUser, addressValidationSchema, addressCltr.update)
app.delete('/api/address/:id', authenticateUser, addressCltr.delete)

app.post('/api/cart/:id', authenticateUser, cartCltr.add) 
app.get('/api/cart/list', authenticateUser, cartCltr.list) 
app.delete('/api/cart/:id', authenticateUser, cartCltr.delete) 
app.put('/api/cart/:id', authenticateUser, cartCltr.update) 

app.get('/api/role', authenticateUser, roleCltr.list)
app.get('/api/role/:id', authenticateUser, roleCltr.show)
app.post('/api/role', authenticateUser,  roleCltr.create)
app.put('/api/role/:id', authenticateUser, roleCltr.update)
app.delete('/api/role/:id', authenticateUser, roleCltr.delete)

app.get('/api/userHasRole', authenticateUser, userHasRolesCltr.list)
app.get('/api/userHasRole/:id', authenticateUser, userHasRolesCltr.show)
app.post('/api/userHasRole', authenticateUser,  userHasRolesCltr.create)
app.put('/api/userHasRole/:id', authenticateUser, userHasRolesCltr.update)
app.delete('/api/userHasRole/:id', authenticateUser, userHasRolesCltr.delete)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))