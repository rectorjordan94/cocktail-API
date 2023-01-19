//! Import Dependencies
const mongoose = require('../utils/connection')
const Cocktail = require('./cocktail')

//! Seed Script
const db = mongoose.connection

db.on('open', () => {
    const startCocktails = [
        { name: 'Old Fashioned', baseSpirit: 'whiskey', shaken: false},
        { name: 'Sidecar', baseSpirit: 'cognac', shaken: true},
        { name: 'Southside', baseSpirit: 'gin', shaken: true},
        { name: 'Margarita', baseSpirit: 'tequila', shaken: true},
        { name: 'Zombie', baseSpirit: 'rum', shaken: true},
    ]
    Cocktail.deleteMany()
        .then(() => {
            Cocktail.create(startCocktails)
                .then(data => {
                    console.log('seeded cocktails: ', data)
                    db.close()
                })
                .catch(err => {
                    console.log('error: ', err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})