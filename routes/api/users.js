const express = require('express')
const router=express.Router()
const User= require('../../Models/User')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
const newUser = {
        name:'abdelazeem',
       email:'m.abdelazem@email.com',
}

// Create the schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    password: {
        type: String, 
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    
    studyYear: {
        type: Date,
        required: false
    },
    
    modeOfTran: {
        type: String,
        required: false
    },
    
    generalAddress: {
        type: String,
        required: false
    },
    
    clubName: {
        type: String,
        required: false
    }
})

module.exports = Users = mongoose.model('Users', UserSchema)
        const addUser = new Users(newUser)
        addUser.save(function (err, addUser) {
                    if (err) return console.error(err);
                        console.log('here')
                  });

                  Users.find(function (err, users) {
                    if (err) return console.error(err);
                    console.log('users',users);
                  })

                  var query = { userType:"normal" };

                  Users.deleteOne(query, function (err, result) {
              
                      if (err) {
              
                          console.log("error query");
              
                      } else {
              
                          console.log(result);
              
                      }
              
                  });

const users = [
   new User (
        name= 'Amina Sedky',
        phoneNumber = '55555', 
        email= 'aminasedky@gmail.com', 
        password = '0000',
        birthday= '16/7/1998',
        studyYear = 3,
        modeOfTran = 'bus', 
        generalAddress = 'mokkatam',
        clubName = 'VGS'),
        new User
    (
        name= 'Sara Walid', 
        phoneNumber= '665555', 
        email='sara@gmail.com',
        password='10000',
        birthday= '8/10/1998',
        studyYear= 3,
        modeOfTran= 'car', 
        generalAddress= 'fifth settlement',
        clubName= 'MUN'
    )
    ];


router.get('/', (req, res) => res.json({users}));

router.get('/:name', (req, res) => {
    const username = req.params.name
    const user = users.find(user => user.name === username)
    res.send(user)
})


router.put('/update/:name', (req, res) => {
    const username = req.params.name 

    const updatedname = req.body.name;
    const updatedphoneNumber = req.body.phoneNumber;
    const updatedemail = req.body.email;
    const updatedpassword = req.body.password;
    const updatedbirthday = req.body.birthday;
    const updatedstudyYear = req.body.studyYear;
    const updatedmodeOfTrans = req.body.modeOfTran;
    const updatedgeneralAddress = req.body.generalAddress;
    const updatedclubName = req.body.clubName;

    const user = users.find(user => user.name === username)

    user.name = updatedname
    user.phoneNumber = updatedphoneNumber
    user.email = updatedemail
    user.password = updatedpassword
    user.birthday = updatedbirthday
    user.studyYear = updatedstudyYear
    user.modeofTrans = updatedmodeOfTrans
    user.generalAddress = updatedgeneralAddress
    user.clubName = updatedclubName
   

    res.send(users)
})

module.exports=router;

