const Cart = require('../models/cart-model');
const Product = require('../models/product-model')
const { validationResult } = require('express-validator')
const cartCltr = {}

cartCltr.add = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id; // Assuming `req.user.id` gives the user's ID for the cart
    console.log(userId, 'user')

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(item => item.productId.equals(product._id));

        if (existingProduct) {
            // If the product exists, increase the quantity
            existingProduct.quantity += 1;
        } else {
            // If the product does not exist, add it with quantity 1
            cart.products.push({ productId: product._id, quantity: 1 });
        }

        // Save the updated cart
        await cart.save();

        res.status(201).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

cartCltr.list = async (req, res) => {
    try { 
        const cartItems = await Cart.find() 
        res.json(cartItems)
    } catch(err) {  
        console.log(err) 
        res.status(500).json({ error: 'Something went wrong' })
    }
}

cartCltr.update = async (req, res) => {
    const { id } = req.params; // `id` should be the product ID to update
    const { quantity } = req.body; // Expected quantity in the request body

    try {
        // Retrieve the cart document (modify the query if you need a specific cart)
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the index of the product within the cart's products array
        const productIndex = cart.products.findIndex(product => product.productId.toString() === id);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Update the quantity of the found product
        cart.products[productIndex].quantity = quantity;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart item quantity updated successfully', cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

cartCltr.delete = async (req, res) => {
    const id = req.params.id;

    try {
        // Assuming you have a Cart model and that it has a products array
        const cart = await Cart.find(); // Find the cart, modify if necessary to find the correct cart

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        

        // Check if the product exists in the cart's products array
        const productIndex = cart[0].products.findIndex(product => product.productId.toString() === id);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Remove the product from the products array
        cart[0].products.splice(productIndex, 1);
        console.log(cart);
        
        await cart[0].save(); // Save the updated cart

        res.json({ message: 'Cart item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


module.exports = cartCltr