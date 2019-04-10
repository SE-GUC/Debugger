const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InterviewSchema = new Schema({

    interviewerEmail: {
        type: String
        , required: true
    }

    ,

    intervieweeEmail: {
        type: String
    }

    ,

    day: {
        type: String
        , required: true
    }

    ,

    date: {
        type: String
        , required: true
    }

    ,

    interviewslot: {
        type: String
        , required: true
    }

    ,

    startTime: {
        type: String
    }

    ,

    endTime: {
        type: String
    }

    ,

    interview: {
        type: Boolean
    }

})

module.exports = Interview = mongoose.model('interviews', InterviewSchema)