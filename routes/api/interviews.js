// arrays
// book vs delete
// free slot of the head in case of adding interview

const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();


const Interview = require('../../Models/Interview');
const User = require('../../models/User');


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
    const oldInterview = req.body.oldInterviewToBeChanged;*/

    const newIntervieweeEmail = req.body.intervieweeEmail;
    const newStartTime = req.body.startTime;
    const newEndTime = req.body.endTime;
    const newInterview = req.body.interview;

    

    
    const schema = {
        interviewerEmail: Joi.string().email().required(),
        day: Joi.string().required(),
        date: Joi.date().required(),
        slot: Joi.string().required(),

        /*intervieweeEmailToBeChanged: Joi.string().email().required(),
        oldStartTimeToBeChanged: Joi.string().isoDate.required(),
        oldEndTimeToBeChanged: Joi.string().isoDate.required(),
        oldInterviewToBeChanged: Joi.bool().required(),*/

        intervieweeEmail: Joi.string().email().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        interview: Joi.bool().required()
    };
    
    const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });


   const interviewsCheck =  interviews.find(
        interviewsCheck => interviewsCheck.interviewerEmail === interviewerEmail &&
        interviewsCheck.day === day &&
        interviewsCheck.date === date &&
        interviewsCheck.interviewslot === slot);
        
    if (!interviewsCheck) { return res.status(404).send({err:'Does not exist'})};

    interviewsCheck.intervieweeEmail = newIntervieweeEmail;
    interviewsCheck.startTime = newStartTime;
    interviewsCheck.endTime = newEndTime;
    interviewsCheck.interview = newInterview;

    res.send(interviewsCheck);
});

module.exports = router;