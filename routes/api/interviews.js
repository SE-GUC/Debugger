
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const mongoose = require('mongoose')
//const sheet = require ("../../Models/Interview")
const validator = require('../../validations/interviewValidations')

const Interview = require('../../Models/Interview')

router.put('/interview/:interviewerEmail', async (req,res) => {
    try {
     const interviewerEmail = req.params.interviewerEmail
     const intr = await Interview.findOne({interviewerEmail})
     if(!intr) return res.status(404).send({error: 'InterviewerSlot does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedinterviewSlot = await Interview.updateOne(req.body)
     res.json({msg: 'Interview Slot updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

// Showing the whole interview sheet
router.get ('/', async(req, res) => {
    try{
        const interviews = await Interview.find()
        res.send (interviews)
    }

    catch (error){
        return res.status(404).send(error.message)
    }

})

/*

const interviews = [  
new Interview('ahmed@gmail.com', 'mohamed@gmail.com' , 'Monday', '11-09-2019', '2nd', '10:00' , '10:30', true),
new Interview('ahmed@gmail.com' , null, 'Monday', '11-09-2019', '3rd', null , null, false),
new Interview('tamer@gmail.com' , null, 'Monday', '11-09-2019', '3rd', null , null, false)
    
];

const users = [
    new User('Ahmed', '01008883742', 'ahmed@gmail.com', 'TheDeveloper19', '11-09-1995', '37-',
    'Car', 'Nasr City', 'VGS')
];


// Showing the whole interview sheet
router.get ('/', (req, res) => res.json({ data: interviews }));

// book/ change interview times
router.put('/edit', (req, res) => {
    const interviewerEmail = req.body.interviewerEmail;
    //const interviewer = vgs_users.find(user => user.email === interviewerEmail)

   //req.body.id
   // const interviewee = vgs_users.find(user => user.email === intervieweeEmail)
    const day = req.body.day;
    const date = req.body.date;
    const slot = req.body.slot;

    /*const oldIntervieweeEmail = req.body.intervieweeEmailToBeChanged;
    const oldStartTime = req.body.oldStartTimeToBeChanged;
    const oldEndTime = req.body.oldEndTimeToBeChanged;
    const oldInterview = req.body.oldInterviewToBeChanged;

    const newIntervieweeEmail = req.body.intervieweeEmail;
    const newStartTime = req.body.startTime;
    const newEndTime = req.body.endTime;
    const newInterview = req.body.interview;


});

// book/ change interview times
router.put('/edit',async(req, res) => {
    try {
         
        const exist = await Interview.find()
        console.log(exist)
        if (exist == false ||!exist ){
            await Interview.create({
                interviewerEmail: 'ahmed@gmail.com'
            ,   intervieweeEmail: 'mohamed@gmail.com'
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '2nd'
            ,   startTime: '10:00'
            ,   endTime: '10:30'
            ,   interview: true
            })

            await Interview.create({
                interviewerEmail: 'ahmed@gmail.com'
            ,   intervieweeEmail: null
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '3rd'
            ,   startTime: null
            ,   endTime: null
            ,   interview: false
            })

            await Interview.create({
                interviewerEmail: 'tamer@gmail.com'
            ,   intervieweeEmail: null
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '3rd'
            ,   startTime: null
            ,   endTime: null
            ,   interview: false
            })

        }
        console.log(await Interview.find())
        const interviewerEmail = req.body.interviewerEmail
        const day = req.body.day
        const date = req.body.date
        const slot = req.body.slot
        const newIntervieweeEmail = req.body.intervieweeEmail
        const newStartTime = req.body.startTime
        const newEndTime = req.body.endTime
        const newInterview = req.body.interview
   
        const schema = {
            interviewerEmail: Joi.string().email().required()
        ,   day: Joi.string().required()
        ,   date: Joi.date().required()
        ,   slot: Joi.string().required()
        ,   intervieweeEmail: Joi.string().email().required()
        ,   startTime: Joi.string().required()
        ,   endTime: Joi.string().required()
        ,   interview: Joi.bool().required()
        };
    

        const result = Joi.validate(req.body, schema)

    const schema = {
        interviewerEmail: Joi.string().email().required(),
        day: Joi.string().required(),
        date: Joi.date().required(),
        slot: Joi.string().required(),

        /*intervieweeEmailToBeChanged: Joi.string().email().required(),
        oldStartTimeToBeChanged: Joi.string().isoDate.required(),
        oldEndTimeToBeChanged: Joi.string().isoDate.required(),
        oldInterviewToBeChanged: Joi.bool().required(),*/

        /*ntervieweeEmail: Joi.string().email().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        interview: Joi.bool().required()
    };
    
    const result = Joi.validate(req.body, schema);

        if (result.error) 
            return res.status(400).send({ error: result.error.details[0].message })


        const interviewsCheck =  await Interview.findOne({
            interviewerEmail: interviewerEmail
        ,   day: day 
        ,   date: date
        ,   interviewslot: slot
        })
        
        if (!interviewsCheck || interviewsCheck == false)
            return res.status(404).send({err:'Does not exist'})
     
        const oldInterview = {
            interviewerEmail: { $eq: interviewerEmail }
        ,   day: { $eq: day }
        ,   date: { $eq: date }
        ,   interviewslot: { $eq: slot }
        }

        const newInt = { $set: {
            intervieweeEmail: newIntervieweeEmail
        ,   startTime: newStartTime
        ,   endTime:  newEndTime
        ,   interview: newInterview
        }}

        await Interview.update (oldInterview, newInt,(err, result) => {
           if (err) 
              res.status(404).send(err.message)
           })

        const updated = await Interview.findOne({
            interviewerEmail: interviewerEmail
        ,   day: day 
        ,   date: date
        ,   interviewslot: slot
        })

        res.send(updated);

    }
    
    catch (error){
        return res.status(404).send(error.message)
    }


})

module.exports = router
=======
    res.send(interviewsCheck);
})
*/
module.exports = router;

