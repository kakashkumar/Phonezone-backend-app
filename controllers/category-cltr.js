const Category = require('../models/category-model')

const categoryCltr = {}

categoryCltr.create = async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.status(201).json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

categoryCltr.list = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

categoryCltr.view = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }
        res.json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

categoryCltr.update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }
        res.json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

categoryCltr.delete = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }
        res.json({ message: 'Category deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

categoryCltr.search = async (req, res) => {
    try {
        const categories = await Category.find({ name: new RegExp(req.query.q, 'i') })
        res.json(categories)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

categoryCltr.getSubcategories = async (req, res) => {
    try {
        const categories = await Category.find({ parentId: req.params.id })
        res.json(categories)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = categoryCltr