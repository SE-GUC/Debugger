const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const MessageSchema = new Schema({
    clubName : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    message : {
        type: String, 
        required: true
    }
})

module.exports = Message = mongoose.model('Messages', MessageSchema)