const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const FAQsSchema = new Schema({
    question: {
        type: String
    },
    askedBy: {
        type: String
    },
    noOfTimes: {
        type: Number
    },
    answer: {
        type: String
    },
    answeredBy: {
        type: String
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model('FAQ', FAQsSchema, 'FAQ')
