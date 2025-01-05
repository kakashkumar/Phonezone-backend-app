const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const roleSchema = new Schema(
    {
        name : {
            type :String
        }
    })
    const Role = model('Roles', roleSchema)
module.exports = Role