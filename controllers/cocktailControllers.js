//! Create Router
const express = require('express')
const Cocktail = require('../models/cocktail')

const router = express.Router()

//! Routes
//* INDEX route
router.get('/', (req, res) => {
    Cocktail.find({})
        .then(cocktails => { res.json({ cocktails: cocktails }) })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

//! Export Router
module.exports = router