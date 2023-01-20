//! Schema and Model for User Resource
const mongoose = require('../utils/connection')
const { Schema, model } = mongoose

//! Define User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

//! Export Model
module.exports = User