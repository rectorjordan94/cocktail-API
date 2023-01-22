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
                res.redirect(`/cocktails/${cocktail.id}`)
            })
            .catch(err => {
                console.log(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        res.redirect(`/error?error=You%20are%20not%20allowed%20to%20comment%20on%20this%20cocktail`)
    }
})

//* DELETE -> to destory a comment
router.delete('/delete/:cocktailId/:commId', (req, res) => {
    const cocktailId = req.params.cocktailId
    const commId = req.params.commId
    Cocktail.findById(cocktailId)
        .then(cocktail => {
            const theComment = cocktail.comments.id(commId)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    cocktail.save()
                    res.redirect(`/cocktails/${cocktail.id}`)
                } else {
                    res.redirect(`/error?error=You%20are%20not%20allowed%20to%delete%20this%comment`)
                }
            } else {
                res.redirect(`/error?error=You%20are%20not%20allowed%20to%delete%20this%comment`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

//! Export Routes
module.exports = router