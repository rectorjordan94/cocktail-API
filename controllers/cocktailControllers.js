//! Create Router
const express = require('express')
const Cocktail = require('../models/cocktail')

const router = express.Router()

//! Routes
//* INDEX route
// finds and displays all cocktails
router.get('/', (req, res) => {
    Cocktail.find({})
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(cocktails => { res.render('cocktails/index', { cocktails }) })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

//* CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    const newCocktail = req.body
    Cocktail.create(newCocktail)
        .then(cocktail => {
            // send a 201 status, along with the json response of the new fruit
            res.status(201).json({cocktail: cocktail.toObject()})
        })
        .catch(err => {
            console.log(err)
        })
})

//* GET route
// Index -> this is a user specific index route, will only show the logged in user's cocktails
router.get('/mine', (req, res) => {
    Cocktail.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(cocktails => {
            // if found display the cocktails
            res.status(200).json({ cocktails: cocktails})
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

//* PUT route
// Update -> updates a specific fruit
// PUT replaces the entire document with a new document from the req.body
router.put('/:id', (req, res) => {
	// get the id from the request url
	const cocktailId = req.params.id
	// tell mongoose to update the fruit
	Cocktail.findById(cocktailId)
    .then(cocktail => {
        if (cocktail.owner == req.session.userId) {
            return cocktail.updateOne(req.body)
        }
    })
		// if successful -> send status
		.then(cocktail => {
			console.log('the updated cocktail', cocktail)
			res.sendStatus(204)
		})
		// if an error, display that
		.catch((error) => res.json(error))
})



//* DELETE route
// Delete -> delete a specific cocktail
router.delete('/:id', (req, res) => {
    // get the fruit id
    const cocktailId = req.params.id
    // delete the fruit
    Cocktail.findById(cocktailId)
        .then(cocktail => {
            if (cocktail.owner == req.session.userId) {
                return cocktail.deleteOne()
            }
        })
        .then(() => {
            res.sendStatus(204)
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

//* SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Cocktail.findById(id)
        .populate('comments.author', 'username')
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