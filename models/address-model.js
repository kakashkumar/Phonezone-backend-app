const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',  
    //     required: true
    // },
    fullName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        
    },
    pincode: {
        type: Number,
        required: true,
    
    },
    flatHouseNo: {
        type: String,
        required: true
    },
    areaStreet: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Address = mongoose.model('Address', addressSchema)
module.exports = Address