const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number
        },
        address:{
            type: String
        },
        defaultAddress: {
            type: {}
        },
        gender:{
            type: String
        },
        resetPasswordToken : {
            type :String,
        },
        resetPasswordExpires:{
            type: Date,
        }
    },
    {
        timestamps: true,
    },
    
)
const User = model('Users', userSchema)
module.exports = User