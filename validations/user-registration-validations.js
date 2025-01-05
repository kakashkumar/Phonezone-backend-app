const User = require('../models/user-model')
const userRegisterValidationSchema = {
    firstName: {
        exists: {
            errorMessage: 'firstName is required'            
        },
        notEmpty: {
            errorMessage: 'firstName cannot be empty'
        },
        trim: true 
    },
    lastName: {
        exists: {
            errorMessage: 'lastName is required'            
        },
        notEmpty: {
            errorMessage: 'lastName cannot be empty'
        },
        trim: true 
    },
    email: {
        exists: {
            errorMessage: 'email is required'            
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        }, 
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(user) {
                    throw new Error('email already taken')
                } else {
                    return true 
                }
            }
        },
        trim: true,
        normalizeEmail: true 
    },
    password: {
        exists: {
            errorMessage: 'password is required'            
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    }
}

module.exports = userRegisterValidationSchema