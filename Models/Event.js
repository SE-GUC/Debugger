

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    eventName : {
        type: String,
        required: true
    },
    eventType : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    }

})


module.exports = mongoose.model('Events', EventSchema, "Event")
