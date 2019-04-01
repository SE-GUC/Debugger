// const uuid= require('uuid')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// class Event 
// {
//     constructor( eventType, description, date)
//     {
//         this.id = uuid.v4();
//         this.eventType =  eventType;
//         this.description = description;
//         this.date = date;
//     };
// };


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

// module.exports = Event