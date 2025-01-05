const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productDetailSchema = new Schema({
Network : {
    Technology : String
}
}, { timestamps: true }) 

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)

module.exports = ProductDetail