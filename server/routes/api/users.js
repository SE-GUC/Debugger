


const express = require('express')
const router=express.Router()
const User= require('../../Models/User')

const usersValidator = require('../../Validations/usersValidations')

//Cruds for users
//get all users
router.get('/', async (req,res) =>{
    const users = await User.find()
    res.json({
        data : users
    })
});

//get a specific user
router.get('/:id', async (req,res) =>{
    const userID = req.params.id
    const users = await User.findById(userID)
    res.json({
        data : users
    })
});

//create a user
router.post('/', async (req,res) =>{
    try {
        const isValidated = usersValidator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message})
        const newUser = await User.create(req.body)
        res.json({msg: 'User was created successfully', data:newUser})
    }
    catch(error) {
        //we will be handling the error later
        console.log(error)
    }
});
//update a specific user
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const user = await Book.findOne({id})
     if(!user) return res.status(404).send({error: 'User does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedUser = await User.updateOne(req.body)
     res.json({msg: 'user updated successfully', data:updatedUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
//delete a specific user
router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedUser = await User.findByIdAndRemove(id)
     res.json({msg:'User was deleted successfully', data: deletedUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

// router.delete('/:name', (req, res) => {
//     const username = req.params.name
//     const user = users.find(user => user.name === username)
//     res.send(user)
// })
//  const deleteUser = function(name){
//     var query = {name };
     
//     Users.deleteOne(query, function (err, result) {
              
//         if (err) {
//                 return err

//         } return name

//     });
//  }
// router.delete('/user/delete:name', function (req, res) {
//             res.send(deleteUser(req.param.name) )
   
//   })


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

