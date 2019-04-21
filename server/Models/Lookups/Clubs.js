const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubsSchema = new Schema({

    club: {
        type: String,
        unique: true
    },
    clubCode: {
        type: Number,
        unique: true
    }
})
module.exports = mongoose.model('Clubs', ClubsSchema, "Clubs")