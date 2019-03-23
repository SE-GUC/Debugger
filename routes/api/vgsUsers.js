const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const mogoose = require('mongoose')

const VGS_User = require('../../models/VGS_User');
// Showing all users
//router.get ('/', (req, res) => res.json({ data: vgs_users }));

// Assigning the booth member
router.put('/assign', async(req, res) => {
    try {

        const exist = await VGS_User.find()
        if (exist == false){
            await VGS_User.create({
                email: 'ghada@gmail.com'
            ,   userType: 'Member'
            ,   clubCommittee:'HR'
            ,   hobbies: 'Playing Volleyball'
            ,   VGSYear: '2016'
            ,   appliedPosition: 'HR Member'
            ,   appStatus: 'Accepted'
            ,   notes: null
            ,   gameName: null
            ,   gameScrSho: null
            ,   downloadLink: null
            ,   boothMember: false
            })
        
            await VGS_User.create({
                email: 'amany@hotmail.com'
            ,   userType: 'Member'
            ,   clubCommittee: 'GDD'
            ,   hobbies: 'Developing games'
            ,   VGSYear: '2014'
            ,   appliedPosition: 'GDD Member'
            ,   appStatus: 'Accepted'
            ,   notes: null
            ,   gameName: null
            ,   gameScrSho: null
            ,   downloadLink: null
            ,   boothMember: true
            })
        
            await VGS_User.create({
                email: 'Jim@yahoo.com'
            ,   userType: null
            ,   clubCommittee: null
            ,   hobbies: null
            ,   VGSYear: null
            ,   appliedPosition: null
            ,   appStatus: 'Rejected'
            ,   notes: null
            ,   gameName: null
            ,   gameScrSho: null
            ,   downloadLink: null
            ,   boothMember: false
            })
        
            await VGS_User.create({
                email: 'ehab@hotmail.com'
            ,   userType: 'Advisor'
            ,   clubCommittee: 'GDD'
            ,   hobbies: 'Coding'
            ,   VGSYear: '2012'
            ,   appliedPosition: 'GDD Advisor'
            ,   appStatus: 'Accepted'
            ,   notes: null
            ,   gameName: null
            ,   gameScrSho: null
            ,   downloadLink: null
            ,   boothMember: false
            })
        }

        const memberEmail = req.body.email
        const schema = {
           email: Joi.string().email().required()
        }

        const result = Joi.validate(req.body, schema)
        if (result.error) 
            return res.status(400).send({ error: result.error.details[0].message })

        const user = await VGS_User.findOne({email: memberEmail})
    
       // checking if he is already a booth member
        if (user.boothMember === true ) 
           return res.status(404).send({err:('This member is already a booth member')})

      // checking if he is even accepted
        if (user.appStatus === 'Rejected' )
           return res.status(404).send({err:'This applicant was rejected and is not a member in the club'})

      // checking if he is a member
        if (user.userType !== 'Member' && user.userType !== 'Recruit' ) 
           return res.status(404).send({err: ('This person position is not member')})

      // Assigning the boothMember
        const old = { email: {$eq: memberEmail} }  
        const newR = { $set: {boothMember: true} }
        await VGS_User.updateOne(old, newR , (err, result) => {
            if (err) 
               res.status(404).send(err.message)
          })
        const boothMembr = await VGS_User.findOne({email: memberEmail})
        res.send(boothMembr)

    }

    catch (error){
        res.status(404).send(error.message);
    }
    
});

module.exports = router;