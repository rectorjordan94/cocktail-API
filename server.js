//! Import Dependencies
const express = require('express')
require('dotenv').config()
const path = require('path')
const CocktailRouter = require('./controllers/cocktailControllers')
const middleware = require('./utils/middleware')

//! Create Express App Object
const app = express()

//! Middleware
middleware(app)


//! Routes
app.get('/', (req, res) => {
    res.send('SERVER IS LIVE')
})

app.use('/cocktails', CocktailRouter)

//! Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`))