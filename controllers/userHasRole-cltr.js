const UserHasRoles = require('../models/userHasRoles-model')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer');
const userHasRolesCltr = {}

userHasRolesCltr.create  = async (req, res) => {
    
    const { userId, roleId, roleName } = req.body;
    const userHasRole = new UserHasRoles({
        userId,
        roleId,
        roleName
    })

    try {
        await userHasRole.save()
        res.status(201).json(userHasRole)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

userHasRolesCltr.list = async (req, res) => {
    try {
        const userHasRoles = await UserHasRoles.find()
        res.json(userHasRoles)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

userHasRolesCltr.show = async (req, res) => {
    const id = req.params.id
    try {
        const userHasRoles = await UserHasRoles.findById(id)
        if (!userHasRoles) {
            return res.status(404).json({ error: 'Address not found' })
        }
        res.json(userHasRoles)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

userHasRolesCltr.update = async (req, res) => {
    const id = req.params.id
    const updateData = req.body

    try {
        const userHasRole = await UserHasRoles.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        if (!userHasRole) {
            return res.status(404).json({ error: 'userHasRole not found' })
        }

        res.json(userHasRole)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

userHasRolesCltr.delete = async (req, res) => {
    const id = req.params.id

    try {
        const userHasRole = await UserHasRoles.findByIdAndDelete(id)

        if (!userHasRole) {
            return res.status(404).json({ error: 'Role not found' })
        }

        res.json({ message: 'Role deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}


module.exports = userHasRolesCltr