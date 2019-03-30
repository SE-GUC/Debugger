// const uuid= require('uuid')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// import EventSchema from './Event'
// import User from './User'

// class EventForm 
// {
//     constructor(eventId, studentId, attendeeName, phoneNumber, email, IdCardNumber)
//     {
//         this.id = uuid.v4();
//         this.eventId = eventId;
//         this.studentId = studentId;
//         this.attendeeName = attendeeName;
//         this.phoneNumber = phoneNumber;
//         this.email = email;
//         this.IdCardNumber = IdCardNumber;
//     };

// };

// module.exports = EventForm

const EventFormSchema = new Schema({
    
    event_eventName : {
        type: String,
        required: true
    },
    user_id : {
        type: String,
        required: true
    },
    attendeeName : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    idCardNumber : {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('EventForm', EventFormSchema, "EventForm")