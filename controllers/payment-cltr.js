//payment-cltr // const Payment = require('../models/payment-model')
// const Order = require('../models/order-model')
// const paymentGateway = require('../services/payment-gateway')    // Assume a service that interacts with the payment gateway
// const fraudDetectionService = require('../services/fraud-detection')
// const paymentController = {}

// // Initiate Payment
// paymentController.initiatePayment = async (req, res) => {
//   try {
//     const { orderId, paymentMethod, amount } = req.body
//     const order = await Order.findById(orderId)

//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' })
//     }

//      // Perform fraud detection before initiating payment
//      const isFraudulent = await fraudDetectionService.checkFraud(order.user, amount)
//      if (isFraudulent) {
//        return res.status(400).json({ error: 'Fraudulent transaction detected' })
//      }

//     // Create a payment request
//     const payment = new Payment({
//       order: orderId,
//       paymentMethod,
//       amount,
//       currency: 'USD' // or any currency
//     })

//     const paymentResponse = await paymentGateway.createPayment(payment)

//     payment.paymentResult = paymentResponse
//     await payment.save()

//     res.status(201).json(payment)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Something went wrong' })
//   }
// }

// // Confirm Payment
// paymentController.confirmPayment = async (req, res) => {
//   try {
//     const { paymentId } = req.params
//     const payment = await Payment.findById(paymentId)

//     if (!payment) {
//       return res.status(404).json({ error: 'Payment not found' })
//     }

//     const paymentStatus = await paymentGateway.getPaymentStatus(payment.paymentResult.id)

//     payment.isPaid = paymentStatus.isPaid
//     payment.paidAt = paymentStatus.paidAt
//     await payment.save()

//     res.json(payment)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Something went wrong' })
//   }
// }


// // Update Payment Status
// paymentController.updatePaymentStatus = async (req, res) => {
//     try {
//       const { paymentId } = req.params
  
//       // Find the payment by ID
//       const payment = await Payment.findById(paymentId)
//       if (!payment) {
//         return res.status(404).json({ error: 'Payment not found' })
//       }
  
//       // Get the latest payment status from the payment gateway
//       const paymentStatus = await paymentGateway.getPaymentStatus(payment.paymentResult.id);
  
//       // Update the payment document with the new status
//       payment.isPaid = paymentStatus.isPaid
//       payment.paidAt = paymentStatus.paidAt
//       await payment.save()
  
//       res.json(payment)
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ error: 'Something went wrong' })
//     }
//   }

// // Refund Payment
// paymentController.refundPayment = async (req, res) => {
//   try {
//     const { paymentId } = req.params
//     const payment = await Payment.findById(paymentId)

//     if (!payment) {
//       return res.status(404).json({ error: 'Payment not found' })
//     }

//     const refundResponse = await paymentGateway.refundPayment(payment.paymentResult.id)

//     payment.isPaid = false
//     payment.paidAt = null
//     await payment.save()

//     res.json({ message: 'Payment refunded', refund: refundResponse })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Something went wrong' })
//   }
// }

// // Handle Payment Notification
// paymentController.handlePaymentNotification = async (req, res) => {
//     try {
//       const { paymentId, status, update_time, email_address } = req.body
  
//       const payment = await Payment.findById(paymentId)
  
//       if (!payment) {
//         return res.status(404).json({ error: 'Payment not found' })
//       }
  
//       payment.paymentResult.status = status
//       payment.paymentResult.update_time = update_time
//       payment.paymentResult.email_address = email_address
//       payment.isPaid = status === 'COMPLETED'
//       payment.paidAt = payment.isPaid ? new Date(update_time) : null
  
//       await payment.save()
  
//       res.json({ message: 'Payment status updated' })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ error: 'Something went wrong' })
//     }
//   }
  
//   // Save Payment Method
// paymentController.savePaymentMethod = async (req, res) => {
//     try {
//       const { userId, paymentMethod } = req.body
//       const user = await User.findById(userId)
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' })
//       }
  
//       user.paymentMethods.push(paymentMethod)
//       await user.save()
  
//       res.json({ message: 'Payment method saved' })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ error: 'Something went wrong' })
//     }
//   };
  
//   // Fraud Detection and Prevention
//   paymentController.fraudDetection = async (req, res) => {
//     try {
//       const { userId, amount } = req.body
//       const user = await user.findById(userId)
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' })
//       }
  
//       const isFraudulent = await fraudDetectionService.checkFraud(userId, amount)
  
//       if (isFraudulent) {
//         return res.status(400).json({ error: 'Fraudulent transaction detected' })
//       }
  
//       res.json({ message: 'Transaction is not fraudulent' })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ error: 'Something went wrong' })
//     }
//   }
  

// module.exports = paymentController