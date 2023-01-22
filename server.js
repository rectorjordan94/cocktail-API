//! Import Dependencies
const express = require('express')
require('dotenv').config()
const path = require('path')
const CocktailRouter = require('./controllers/cocktailControllers')
const UserRouter = require('./controllers/userController')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')

//! Create Express App Object
const app = require('liquid-express-views')(express())

//! Middleware
middleware(app)

//! Routes
app.get('/', (req, res) => {
    const { username, loggedIn, userId} = req.session
    res.render('home.liquid', { username, loggedIn, userId })
})

app.use('/cocktails', CocktailRouter)
app.use('/users', UserRouter)
app.use('/comments', CommentRouter)

app.get('/error', (req, res) => {
    const error = req.query.error || 'This page does not exist'
    res.render('error.liquid', { error, ...req.session })
})

app.all('*', (req, res) => {
    res.redirect('/error')
})

//! Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`))