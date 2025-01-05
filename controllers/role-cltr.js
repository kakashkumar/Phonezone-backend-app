const Role = require('../models/role-model')
const { validationResult } = require('express-validator')

const roleCltr = {}

roleCltr.list = async (req, res) => {
    try {
        const roles = await Role.find()
        res.json(roles)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

roleCltr.show = async (req, res) => {
    const id = req.params.id
    try {
        const role = await Role.findById(id)
        if (!role) {
            return res.status(404).json({ error: 'Address not found' })
        }
        res.json(role)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

roleCltr.create = async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }
    console.log(req.body);
    

    const { name } = req.body;
    const role = new Role({
        name
    })

    try {
        await role.save()
        res.status(201).json(role)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

roleCltr.update = async (req, res) => {
    const id = req.params.id
    const updateData = req.body

    try {
        const role = await Role.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        if (!role) {
            return res.status(404).json({ error: 'Role not found' })
        }

        res.json(role)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

roleCltr.delete = async (req, res) => {
    const id = req.params.id

    try {
        const role = await Role.findByIdAndDelete(id)

        if (!role) {
            return res.status(404).json({ error: 'Role not found' })
        }

        res.json({ message: 'Role deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = roleCltr