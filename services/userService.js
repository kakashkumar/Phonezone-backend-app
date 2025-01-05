const User = require('../models/user-model');

async function getUserWithUserRoles() {
    // Define the aggregation pipeline
    const pipeline = [
        {
            $lookup: {
                from: 'userhasroles',            // Assuming the related collection is named 'userRoles'
                localField: '_id',            // The field in 'users' to match
                foreignField: 'userId',       // The field in 'userRoles' to match
                as: 'userRolesDetails'        // Name of the array field to add in the results
            }
        },
        {
            $unwind: { path: '$userRolesDetails', preserveNullAndEmptyArrays: true }   // Flatten the results
        }
    ];

    // Perform aggregation directly on the User model
    const result = await User.aggregate(pipeline);
    return result;
}

module.exports = { getUserWithUserRoles };
