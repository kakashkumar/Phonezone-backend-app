const Address = require('../models/address-model')
const { validationResult } = require('express-validator')

const addressCltr = {}

addressCltr.list = async (req, res) => {
    try {
        const addresses = await Address.find()
        res.json(addresses)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

addressCltr.show = async (req, res) => {
    const id = req.params.id
    try {
        const address = await Address.findById(id)
        if (!address) {
            return res.status(404).json({ error: 'Address not found' })
        }
        res.json(address)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

addressCltr.create = async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }
    console.log(req.body);
    

    const { fullName, mobileNumber, pincode, flatHouseNo, areaStreet, landmark, city, state, country } = req.body;
    const address = new Address({
        fullName,
        mobileNumber,
        pincode,
        flatHouseNo,
        areaStreet,
        landmark,
        city,
        state,
        country
    })

    try {
        await address.save()
        res.status(201).json(address)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

addressCltr.update = async (req, res) => {
    const id = req.params.id
    const updateData = req.body

    try {
        const address = await Address.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        if (!address) {
            return res.status(404).json({ error: 'Address not found' })
        }

        res.json(address)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

addressCltr.delete = async (req, res) => {
    const id = req.params.id

    try {
        const address = await Address.findByIdAndDelete(id)

        if (!address) {
            return res.status(404).json({ error: 'Address not found' })
        }

        res.json({ message: 'Address deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = addressCltr