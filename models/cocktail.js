const mongoose = require('../utils/connection')
const { Schema, model } = mongoose

const cocktailSchema = new Schema({
    name: {
        type: String
    }, 
    baseSpirit: {
        type: String
    },
    shaken: {
        type: Boolean
    }, 
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cocktail = model('Cocktail', cocktailSchema)

//! Export Model
module.exports = Cocktail