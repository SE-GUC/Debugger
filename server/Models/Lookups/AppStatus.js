const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppStatusSchema = new Schema({

    AppStatus: {
        type: String,
        unique: true
    },
    AppStatusCode: {
        type: Number,
        unique: true
    }
})
module.exports = mongoose.model('AppStatus', AppStatusSchema, "AppStatus")