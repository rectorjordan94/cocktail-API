//! Create Router
const express = require('express')
const Cocktail = require('../models/cocktail')

const router = express.Router()

//! Routes
//* INDEX route
// finds and displays all cocktails
router.get('/', (req, res) => {
    Cocktail.find({})
        .then(cocktails => { res.json({ cocktails: cocktails }) })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

//* CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    const newCocktail = req.body
    console.log(newCocktail)
    Cocktail.create(newCocktail)
        .then(cocktail => {
            // send a 201 status, along with the json response of the new fruit
            res.status(201).json({cocktail: cocktail.toObject()})
        })
        .catch(err => {
            console.log(err)
        })
})

//* PUT route
// Update -> updates a specific fruit
// PUT replaces the entire document with a new document from the req.body
router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedCocktail = req.body
    Cocktail.findByIdAndUpdate(id, updatedCocktail, { new: true })
        .then(cocktail => {
            console.log('updated cocktail: ', cocktail)
            res.sendStatus(204) // success message, no content
        })
        .catch(err => console.log(err))
})


//* DELETE route
// Delete -> delete a specific cocktail
router.delete('/:id', (req, res) => {
    // get the id from the req
    const id = req.params.id
    // find and delete the cocktail
    Cocktail.findByIdAndRemove(id)
        .then(() => {
            // send a 204 if successful
            res.sendStatus(204)
        })
        // send an error if not
        .catch(err => console.log(err))
})

//* SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Cocktail.findById(id)
        .then(cocktail => {
            res.json({cocktail: cocktail})
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

//! Export Router
module.exports = router