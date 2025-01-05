const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const crypto = require('node:crypto');
const nodemailer = require('nodemailer');
const { getUserWithUserRoles } = require('../services/userService');
const mongoose = require('mongoose');
const usersCltr = {}

usersCltr.register = async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array()})
    } 
    const body = req.body 
    try { 
        const salt = await bcryptjs.genSalt() 
        const hashPassword = await bcryptjs.hash(body.password, salt) 
        const user = new User(body)
        user.password = hashPassword
        await user.save() 
        res.status(201).json(user) 
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const users = await getUserWithUserRoles();
        const user = await User.findOne({ email });

        const filteredUser = users.filter(x => x.email === email)

        if (user) {
            const isAuth = await bcryptjs.compare(password, user.password);
            if (isAuth) {
                const tokenData = {
                    id: user._id,
                };
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });
                return res.json({
                    token,
                    user: filteredUser[0],
                });
            } else {
                return res.status(400).json({ errors: 'Invalid email or password' });
            }
        } else {
            return res.status(400).json({ errors: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ errors: 'Something went wrong' });
    }
};

usersCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user)
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}

usersCltr.checkEmail = async (req, res) => {
    const email = req.query.email 
    const user = await User.findOne({ email: email })
    if(user) {
        res.json({ "is_email_registered" : true })
    } else { 
        res.json({ "is_email_registered": false  })
    }
}

usersCltr.updateUser = async (req, res) => {
    try {
        const userId = req.query.id
        const body = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (user) {
            // Update user properties
            user.firstName = body.firstName || user.firstName;
            user.lastName = body.lastName || user.lastName;
            user.phone = body.phone || user.phone;
            user.gender = body.gender || user.gender;
            user.address = body.address || user.address;
            user.defaultAddress = body.defaultAddress || user.defaultAddress;

            // Save the updated user
            const updatedUser = await user.save();

            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        res.status(500).json({ error: 'Something went wrong' });
    }
};

usersCltr.userProfile = async (req, res) => {
    try {
        // Get the user ID from the query parameters
        const userId = req.query.id;

        // Convert userId to ObjectId if it's a string
        const objectId = new mongoose.Types.ObjectId(userId);

        // Perform aggregation to get user with roles by matching userId
        const users = await getUserWithUserRoles();

        // Find the specific user with their roles
        const user = users.find(x => x._id.toString() === objectId.toString());

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user); // Return the user profile with roles
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ error: 'Something went wrong' });
    }
};

usersCltr.resetPassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the old password
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

usersCltr.forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: 'User with this email does not exist' });
        }

        
        const resetToken = crypto.randomBytes(10).toString('hex')

        user.password = await bcryptjs.hash(resetToken, 10)

        await user.save();

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset Request',
            text: `Your Password has been reset successfylly.\n\n
            New password = ${resetToken}\n\n.
            Please Change Your password later.`
        };

        await transporter.sendMail(mailOptions)

        res.status(200).json({ message: 'Password reset email sent successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' })
    }

}

usersCltr.getUsers = async (req, res) => {
    try {
        const users = await getUserWithUserRoles();
        
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = usersCltr
