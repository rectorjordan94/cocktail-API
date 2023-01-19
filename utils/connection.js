//! Import Dependencies
require('dotenv').config()
const mongoose = require('mongoose')

//! Database Connection

const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('disconnected from mongoose'))
    .on('error', (err) => console.log('error: \n', err))

//! Export Connection
module.exports = mongoose