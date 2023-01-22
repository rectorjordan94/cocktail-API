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
        .then(cocktails => { res.render('cocktails/index', { cocktails, ...req.session }) })
        .catch(err => {
            console.log(err)
            res.redirect(`error?error=${err}`)
        })
})

//* GET -> new page
router.get('/new', (req, res) => {
    res.render('cocktails/new', {...req.session})
})

//* CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    req.body.shaken = req.body.shaken === 'on' ? true: false
    const newCocktail = req.body
    Cocktail.create(newCocktail)
        .then(cocktail => {
            // send a 201 status, along with the json response of the new fruit
            res.redirect('/cocktails/mine')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
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
            res.render('cocktails/index', {cocktails, ...req.session})
        })
        .catch(err => {
            console.log(err)
            res.redirect(`error?error=${err}`)
        })
})

//* GET -> EDIT
router.get('/edit/:id', (req, res) => {
    const cocktailId = req.params.id
    Cocktail.findById(cocktailId)
        .then(cocktail => {
            res.render('cocktails/edit', {cocktail, ...req.session})
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

//* PUT route
// Update -> updates a specific fruit
// PUT replaces the entire document with a new document from the req.body
router.put('/:id', (req, res) => {
	// get the id from the request url
    const id = req.params.id
    req.body.shaken = req.body.shaken === 'on' ? true: false
	// tell mongoose to update the fruit
	Cocktail.findById(id)
    .then(cocktail => {
        if (cocktail.owner == req.session.userId) {
            return cocktail.updateOne(req.body)
        } else {
            res.redirect(`error?error=You%20are%20not%20allowed%20to%20edit%20this%20cocktail`)
        }
    })
	.then(cocktail => {
		res.redirect('/cocktails/mine')
	})
	// if an error, display that
    .catch((err) => {
        res.redirect(`/error?error=${err}`)
    })
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
            res.redirect('/cocktails/mine')
        })
        .catch((err) => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
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
            res.render('cocktails/show', {cocktail, ...req.session})
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

//! Export Router
module.exports = router