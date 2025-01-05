const { checkSchema } = require('express-validator')

 const addressValidationSchema = checkSchema({
    // user: {
    //     exists: {
    //         errorMessage: 'User ID is required'
    //     },
    //     notEmpty: {
    //         errorMessage: 'User ID cannot be empty'
    //     },
    //     isMongoId: {
    //         errorMessage: 'User ID should be a valid MongoDB ObjectId'
    //     }
    // },
    fullName: {
        exists: {
            errorMessage: 'Full name is required'
        },
        notEmpty: {
            errorMessage: 'Full name cannot be empty'
        },
        trim: true,
        isString: {
            errorMessage: 'Full name should be a string'
        }
    },
    mobileNumber: {
        exists: {
            errorMessage: 'Mobile number is required'
        },
        notEmpty: {
            errorMessage: 'Mobile number cannot be empty'
        },
        isString: {
            errorMessage: 'Mobile number should be a string'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Mobile number should be 10 digits long'
        },
        matches: {
            options: /^[6-9]\d{9}$/,
            errorMessage: 'Mobile number should start with 6, 7, 8, or 9 and contain 10 digits'
        }
    },
    pincode: {
        exists: {
            errorMessage: 'Pincode is required'
        },
        notEmpty: {
            errorMessage: 'Pincode cannot be empty'
        },
        isString: {
            errorMessage: 'Pincode should be a string'
        },
        isLength: {
            options: { min: 6, max: 6 },
            errorMessage: 'Pincode should be 6 digits long'
        },
        isNumeric: {
            errorMessage: 'Pincode should contain only numbers',
        }
    },
    flatHouseNo: {
        exists: {
            errorMessage: 'Flat/House number is required'
        },
        notEmpty: {
            errorMessage: 'Flat/House number cannot be empty'
        },
        isString: {
            errorMessage: 'Flat/House number should be a string'
        }
    },
    areaStreet: {
        exists: {
            errorMessage: 'Area/Street is required'
        },
        notEmpty: {
            errorMessage: 'Area/Street cannot be empty'
        },
        isString: {
            errorMessage: 'Area/Street should be a string'
        }
    },
    landmark: {
        optional: true,
        isString: {
            errorMessage: 'Landmark should be a string'
        }
    },
    city: {
        exists: {
            errorMessage: 'City is required'
        },
        notEmpty: {
            errorMessage: 'City cannot be empty'
        },
        isString: {
            errorMessage: 'City should be a string'
        }
    },
    state: {
        exists: {
            errorMessage: 'State is required'
        },
        notEmpty: {
            errorMessage: 'State cannot be empty'
        },
        isString: {
            errorMessage: 'State should be a string'
        }
    },
    country: {
        exists: {
            errorMessage: 'Country is required'
        },
        notEmpty: {
            errorMessage: 'Country cannot be empty'
        },
        isString: {
            errorMessage: 'Country should be a string'
        }
    },
    createdAt: {
        optional: true,
        isISO8601: {
            errorMessage: 'CreatedAt should be a valid ISO 8601 date string'
        }
    },
    updatedAt: {
        optional: true,
        isISO8601: {
            errorMessage: 'UpdatedAt should be a valid ISO 8601 date string'
        }
    }
})

module.exports = addressValidationSchema