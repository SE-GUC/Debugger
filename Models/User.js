const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    },
    studyYear:{
        type: Number,
        required: true
    },
    modeOfTran:{
        type: String,
        required: true
    },
    generalAddress:{
        type: String,
        required: true
    },
    clubName:{
        type: String,
    }
})



module.exports = User = mongoose.model('users' , UserSchema)