
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventFormSchema = new Schema({
    
    event_id : {
        type : String ,
           ref : 'Event' 
    } ,
   

    student_id : {
        type: String
    
    },
    attendeeName : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    nationalidCardNumber : {
        type: Number
        
    }

})

module.exports = EventForm=mongoose.model('eventforms', EventFormSchema) 