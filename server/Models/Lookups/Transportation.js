const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransportationSchema = new Schema({

    TransportationName: {
        type: String,
        unique: true
    },
    TransportationCode: {
        type: Number,
        unique: true
    }
})
module.exports = mongoose.model('Transportation', TransportationSchema, "Transportation")