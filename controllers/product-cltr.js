const Product = require('../models/product-model')
const Review = require('../models/product-model')
const mongoose = require('mongoose');
const { validationResult } = require('express-validator')
const productCltr = {}

productCltr.list = async (req, res) => {
    try { 
        const product = await Product.find() 
        res.json(product)
    } catch(err) {  
        console.log(err) 
        res.status(500).json({ error: 'Something went wrong' })
    }
}

productCltr.show = async (req, res) => {
    const id = req.params.id 
    console.log(id, 'id');
    try {
        const product = await Product.findById(id)
        res.json(product)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'Something went wrong' })
    }
}

productCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name,
        brand,
        category,
        description,
        image,
        sp,
        mrp,
        countInStock,
        technology,
        announced,
        status,
        dimensions,
        build,
        sim,
        weight,
        type,
        size,
        resolution,
        protection,
        os,
        chipset,
        cpu,
        gpu,
        cardSlot,
        internal,
        megaPixel,
        aperture,
        features,
        video,
        smegaPixel,
        saperture,
        sfeatures,
        svideo,
        loudSpeaker,
        jack,
        wlan,
        bluetooth,
        positioning,
        nfc,
        radio,
        usb,
        sensors,
        specialFeatures,
        batteryType,
        batteryCapacity,
        charging } = req.body
         log
    const product = new Product({
        name,
        brand,
        category,
        description,
        image,
        sp,
        mrp,
        countInStock,
        technology,
        announced,
        status,
        dimensions,
        build,
        sim,
        weight,
        type,
        size,
        resolution,
        protection,
        os,
        chipset,
        cpu,
        gpu,
        cardSlot,
        internal,
        megaPixel,
        aperture,
        features,
        video,
        smegaPixel,
        saperture,
        sfeatures,
        svideo,
        loudSpeaker,
        jack,
        wlan,
        bluetooth,
        positioning,
        nfc,
        radio,
        usb,
        sensors,
        specialFeatures,
        batteryType,
        batteryCapacity,
        charging,
    })

    try {
        console.log(product);
        await product.save()
        res.status(201).json(product)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

productCltr.update = async (req, res) => {
    console.log("hi");
    try {
        const productId = req.query.id
        const updateData = req.body
        
        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true })

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.json(product)
    } catch (err) {
        console.error(err)  
        res.status(500).json({ error: 'Something went wrong' })
    }
}


productCltr.reviews = async (req, res) => {
    const id = req.params.id 
    try {
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({ error: 'Record not found' })
        }
        const reviews = await Review.find({ product: product._id })
        res.json(reviews)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

productCltr.singleReview = async (req, res) =>  {
    const id = req.params.id 
    const reviewId = req.params.reviewId 
    try {
        const product = await Product.findById(id)
        if(!product) {
            return res.status(404).json({ error: 'Record not found' })
        }
        const review = await Review.findOne({ _id: reviewId, product: product._id })
        res.json(review) 
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

productCltr.reviewUpdate = async (req, res) => {
    const id = req.params.id 
    const reviewId = req.params.reviewId 
    const body = req.body 
    try {
        const product = await Product.findById(id)
        if(!product) {
            return res.status(404).json({ error: 'Record not found' })
        }
        const review = await Review.findOneAndUpdate({ _id: reviewId, product: id }, body, { new: true })
        res.json(review) 
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

productCltr.getProductsById = async (req, res) => {
        const { ids } = req.query; // Assuming IDs are passed as a query parameter
    
        if (!ids) {
            return res.status(200).json([]); // Return empty array when no IDs are provided
        }
    
        try {
            // Split and convert each ID to ObjectId
            let idArray;
            try {
                idArray = ids.split(',').map(id => new mongoose.Types.ObjectId(id.trim()));
            } catch (error) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }
    
            // Find products by IDs
            const products = await Product.find({ _id: { $in: idArray } });
    
            res.status(200).json(products);
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    };

    productCltr.delete = async (req, res) => {
        const id = req.params.id
    
        try {
            const product = await Product.findByIdAndDelete(id)
    
            if (!product) {
                return res.status(404).json({ error: 'product not found' })
            }
    
            res.json({ message: 'product deleted successfully' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Something went wrong' })
        }
    }

module.exports = productCltr