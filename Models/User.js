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


module.exports = User
const express = require('express')
const mongoose = require('mongoose')
app.post('/api/Users/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const phoneNumber = req.body.phoneNumber
    const email = req.body.email
    const password = req.body.password
    const birthday = req.body.birthday
    const studyYear = req.body.studyYear
    const modeOfTran = req.body.modeOfTran
    const generalAddress = req.body.generalAddress
    const clubName = req.body.clubName


    
    const User = {
        id: id,
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        birthday: birthday,
        studyYear: studyYear,
        modeOfTran: modeOfTran,
        generalAddress: generalAddress,
        clubName: clubName



    }
    Users.push(user)
    res.send(Users)
})

module.exports = User = mongoose.model('users' , UserSchema)
