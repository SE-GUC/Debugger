// const uuid= require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema



// Create the schema
const AWGSchema = new Schema({
    clubDescription : {
        type: String,
        required: true
    },
    clubName : {
        type: String,
        required: true
    },
    aboutUs : {
        type: String,
        required: true
    },
    contactUs : {
        type: String, 
        required: true
    }
})

module.exports = AWG = mongoose.model('AWGs', AWGSchema)
