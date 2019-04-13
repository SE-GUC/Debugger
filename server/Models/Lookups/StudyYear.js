const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudyYearSchema = new Schema({

    StudyYear: {
        type: String,
        unique: true
    },
    StudyYearCode: {
        type: Number,
        unique: true
    }
})
module.exports = mongoose.model('StudyYear', StudyYearSchema, "StudyYear")