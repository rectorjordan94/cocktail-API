//! Import Dependencies
const express = require('express')
require('dotenv').config()
const path = require('path')
const cocktailRouter = require('./controllers/cocktailControllers')

//! Create Express App Object
const app = express()

//! Routes
app.get('/', (req, res) => {
    res.send('SERVER IS LIVE')
})

app.use('/cocktails', cocktailRouter)

//! Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on port ${PORT}`))