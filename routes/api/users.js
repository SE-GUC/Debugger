const express = require('express')
const router=express.Router()
const User= require('../../Models/User')

// const users = [
//    new User (
//         name= 'Amina Sedky',
//         phoneNumber = '55555', 
//         email= 'aminasedky@gmail.com', 
//         password = '0000',
//         birthday= '16/7/1998',
//         studyYear = 3,
//         modeOfTran = 'bus', 
//         generalAddress = 'mokkatam',
//         clubName = 'VGS'),
//         new User
//     (
//         name= 'Sara Walid', 
//         phoneNumber= '665555', 
//         email='sara@gmail.com',
//         password='10000',
//         birthday= '8/10/1998',
//         studyYear= 3,
//         modeOfTran= 'car', 
//         generalAddress= 'fifth settlement',
//         clubName= 'MUN'
//     )
//     ];

   


// router.get('/', (req, res) => res.json({users}));

// router.get('/:name', (req, res) => {
//     const username = req.params.name
//     const user = users.find(user => user.name === username)
//     res.send(user)
// })


// router.put('/update/:name', (req, res) => {
//     const username = req.params.name 

//     const updatedname = req.body.name;
//     const updatedphoneNumber = req.body.phoneNumber;
//     const updatedemail = req.body.email;
//     const updatedpassword = req.body.password;
//     const updatedbirthday = req.body.birthday;
//     const updatedstudyYear = req.body.studyYear;
//     const updatedmodeOfTrans = req.body.modeOfTran;
//     const updatedgeneralAddress = req.body.generalAddress;
//     const updatedclubName = req.body.clubName;

//     const user = users.find(user => user.name === username)

//     user.name = updatedname
//     user.phoneNumber = updatedphoneNumber
//     user.email = updatedemail
//     user.password = updatedpassword
//     user.birthday = updatedbirthday
//     user.studyYear = updatedstudyYear
//     user.modeofTrans = updatedmodeOfTrans
//     user.generalAddress = updatedgeneralAddress
//     user.clubName = updatedclubName
   

//     res.send(users)
// })

module.exports=router;
const joi =  require("joi");
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const User = require('./routes/api/users')
const app = express()
const db = require('./config/keys').mongoURI
.connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

    router.post('/', async (req, res) => {
        try {

            const validation = validator.createValidation(req.body)
            if (validation.error)
               return res.status(400).send({ error: validation.error.details[0].message })
               const username = req.body.name
               const phoneNumber = req.body.phoneNumber
               const email = req.body.email
               const password = req.body.password
               const birthday = req.body.birthday
               const studyYear = req.body.studyYear
               const modeOfTran = req.body.modeOfTran
               const generalAddress = req.body.generalAddress
               const clubName = req.body.clubName



      const User = await User.findOne({ name: user })
    
      if (username)
         return res.status(400).json({ error: 'Name already exists' })

      await User.create(req.body)
      const users = await User.find()
    
    
     res.json({ msg: 'User is created successfully', data: users })}
     catch (error) {
        res.status(404).send(error.message)}})