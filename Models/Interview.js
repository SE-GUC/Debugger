const uuid= require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema



// When a Head adds a free slot in his sheet , his email, name, date and interviewSlot 
// will be automatically added to this table and the startTime and endTime
// attributes will be set to null, interview attribute will be set to false
// Then, if a booth member wants to add an interview, he can set the value of these attributes.
// If he wants to chnage the interviewer, he can simply set these attributes 
// to null (false for interview) and add the interview to another interviewer


const InterviewSchema = new Schema({

    interviewerEmail: {
        type: String,
        required: true
    },

    intervieweeEmail:  {
        type: String
    },

    day:  {
       type: String,
       required: true
    },

    date:  {
       type: String,
       required: true
    },

    interviewslot:  {
       type: String,
       required: true
    },
    
    date:  {
        type: String,
        required: true
    },
    
    interviewslot:  {
        type: String,
        required: true
    },

    startTime: {
        type: String
    },

    endTime: {
        type: String
    },

   interview: {
      type: Boolean 
    }

})

module.exports = Interview = mongoose.model('interviews', InterviewSchema)