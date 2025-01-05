const Order = require('../models/order-model')
const Product = require('../models/product-model')
const { validationResult } = require('express-validator')

const orderCltr = {}


orderCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    
    const { user, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body
    console.log(req.body);

    try {
        
        const order = new Order({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false,
        })

        
        const createdOrder = await order.save()

        // Update product stock levels
        for (let item of orderItems) {
            const product = await Product.findById(item.product)
            product.countInStock -= item.qty
            await product.save()
        }

        res.status(201).json(createdOrder)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}


orderCltr.view = async (req, res) => {
    const orderId = req.query.id
    try {
        const order = await Order.findById(orderId).populate('user', 'name email')
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        res.json(order)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}


orderCltr.list = async (req, res) => {
    const userId = req.query.userId
    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}


orderCltr.update = async (req, res) => {
    const orderId = req.query.id
    const updates = req.body

    try {
        const order = await Order.findByIdAndUpdate(orderId, updates, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        res.json(order)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
};


orderCltr.cancel = async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        if (order.isDelivered) {
            return res.status(400).json({ error: 'Cannot cancel a delivered order' })
        }

        order.isCancelled = true
        await order.save()

        res.json({ message: 'Order cancelled successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = orderCltr