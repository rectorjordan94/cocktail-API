//! Import Dependencies
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//! Create Router
const router = express.Router()

//! Routes
//* GET -> users/signup
// this renders a liquid page with the sign up form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

//* POST -> /users/signup
// this route creates new users in our db
router.post('/signup', async (req, res) => {
    // this route will take a req.body and use that data to create a user
    const newUser = req.body
    // need to encrypt the password with bcrypt, bcrypt requires the use of async and await
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    // then create the user
    User.create(newUser)
        .then(user => {
            // if successful send a 201 status
            res.redirect('/users/login')
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=username%20taken`)
        })
})

//* GET -> /users/login
router.get('/login', (req, res) => {
    res.render('users/login')
})

//* POST -> /users/login
// route creates a new session in our db(and in the browser)
router.post('/login', async (req, res) => {
    // destructure the username and password from our req.body
    const { username, password } = req.body
    // search the db, for a user with a specific username
    User.findOne({ username })
        .then(async (user) => {
            // check that a user exists
            if (user) {
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id
                    // send 201 response and the user as json
                    res.redirect('/')
                } else {
                    res.redirect(`/error?error=username%20or%20password%20is%20incorrect`)
                }
            } else {
                res.redirect(`/error?error=user%20does%20not%20exist`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

//* GET -> /users/logout
// this route renders a page that allows the user to log out
router.get('/logout', (req,res) => {
    res.render('users/logout')
})

//* DELETE -> /users/logout
// This route destroys a session in our db(and in the browser)
router.delete('/logout', (req, res) => {
    // destroy the session and send an appropriate response
    req.session.destroy(() => {
        console.log('this is req.session upon logout \n', req.session)
        // eventually we will redirect users here, but thats after adding the view layer
        res.redirect('/')
    })
})

//! Export Router
module.exports = router