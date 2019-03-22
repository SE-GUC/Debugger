const uuid= require('uuid')


class User 
{
    constructor(name, phoneNumber, email, password, birthday, studyYear, modeOfTran, 
                generalAddress, clubName)
                {
                    this.id= uuid.v4();
                    this.name = name;
                    this.phoneNumber = phoneNumber;
                    this.email = email;
                    this.password = password;
                    this.birthday = birthday;
                    this.studyYear = studyYear;
                    this.modeOfTran = modeOfTran;
                    this.generalAddress = generalAddress;
                    this.clubName = clubName;
                };
};

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