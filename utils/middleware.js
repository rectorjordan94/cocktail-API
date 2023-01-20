//! Import Dependencies
const express = require('express')
const morgan = require('morgan')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')

//! Middleware Function
const middleware = (app) => {
    app.use(morgan('dev'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(express.json())
}

//! Export Middleware Function
module.exports = middleware