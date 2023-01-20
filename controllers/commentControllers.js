//! Import Dependencies
const express = require('express')
const Cocktail = require('../models/cocktail')

//! Create Router
const router = express.Router()

//! Routes
//* POST -> /comments/<someCocktailId>
router.post('/:cocktailId', (req, res) => {
    const cocktailId = req.params.cocktailId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
        const theComment = req.body
        Cocktail.findById(cocktailId)
            .then(cocktail => {
                cocktail.comments.push(theComment)
                return cocktail.save()
            })
            .then(cocktail => {
                res.status(201).json({ cocktail: cocktail })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    } else {
        res.sendStatus(401)
    }
})

//* DELETE -> to destory a comment
router.delete('/delete/:cocktailId/:commId', (req, res) => {
    const cocktailId = req.params.cocktailId
    const commId = req.params.commId
    Cocktail.findById(cocktailId)
        .then(cocktail => {
            const theComment = cocktail.comments.id(commId)
            if (theComment.author = req.session.userId) {
                theComment.remove()
                return cocktail.save()
            } else {
                return
            }
        })
        .then(cocktail => {
            console.log('updated cocktail', cocktail)
            res.sendStatus(204)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

//! Export Routes
module.exports = router