
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    
    name : {
        type: String,
        required: true
    },
    PhoneNumber : {
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    birthDay : {
        type: Date,
        required: true
    },
    studyYear : {
        type: String,
        required: true
    },
    modeOfTran : {
        type: Number,
        required: true
    },
    generalAddress : {
        type: String,
        required: true
    },
    clubName : {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', UserSchema, "User")