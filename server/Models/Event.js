const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    eventName : {
        type: String,
        required: true
    },
    eventType : {
        type: String
        
    },
    description : {
        type: String,
        required: true
    },
    date : {
        type: String 

        
    }

})


module.exports =Event= mongoose.model('events', EventSchema)
