const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

/*
const Interview = require('../../Models/Interview');
const HeadFreeSlot = require('../../models/HeadFreeSlot');
const User = require ('../../models/User');

const users = [
     new User('Ahmed', '01008883742', 'ahmed@gmail.com', 'TheDeveloper19', '11-09-1995', '37-',
    'Car', 'Nasr City', 'VGS')
];


//const ahmed = users.find(user => user.email === 'ahmed@gmail.com')
//const ahmedId = ahmed.id
//console.log(users)


const headFreeSlots = [
    new HeadFreeSlot('ahmed@gmail.com', 'Monday', '11-09-2019', '2nd' ),
    new HeadFreeSlot('ahmed@gmail.com', 'Monday', '11-09-2019', '3rd' ),
    new HeadFreeSlot('tamer@gmail.com', 'Monday', '11-09-2019', '3rd' )
 ];


 const interviews = [ 
   new Interview('ahmed@gmail.com', 'mohamed@gmail.com' , 'Monday', '11-09-2019', '2nd', '10:00' , '10:30', true),
   new Interview('ahmed@gmail.com' , null, 'Monday', '11-09-2019', '3rd', null , null, false),
   new Interview('tamer@gmail.com' , null, 'Monday', '11-09-2019', '3rd', null , null, false)
    
];

//console.log(headFreeSlots)
//console.log(interviews)



// Showing the whole free slots table
router.get ('/view', (req, res) => {
    const userEmail = req.body.email;

    const schema = {
        email: Joi.string().email().required()};

    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    res.send(headFreeSlots.filter(freeSlots => freeSlots.headEmail === userEmail));

});

router.post ('/add', (req, res) => {
    const email = req.body.email
    const day = req.body.day
    const date = req.body.date
    const slot = req.body.slot


    const schema = {
        email: Joi.string().email().required(),
        day: Joi.string().required(),
        date: Joi.date().required(),
        slot: Joi.string().required()
    };
    
    const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    
    const headSlot = headFreeSlots.find (headSlot => headSlot.headEmail === email &&
        headSlot.date === date && headSlot.day === day && headSlot.slot === slot);
    
    if (headSlot) return res.status(404).send({err:'Already exists'});

    newFreeSlot = new HeadFreeSlot (email, day, date, slot);
    headFreeSlots.push(newFreeSlot);

    newInterview = new Interview (email, null, day, date, slot, null, null, false );
    interviews.push(newInterview);

   // console.log(interviews);
    res.send (headFreeSlots.filter (headSlot => headSlot.headEmail === email));
    

});


// edit my free slots
router.put('/update/',  (req, res) => {
    const headEmail = req.body.email;
    const oldDay = req.body.oldDayToBeChanged;
    const oldDate = req.body.oldDateToBeChanged;
    const oldSlot = req.body.oldSlotToBeChanged;

    const day = req.body.newDay;
    const date = req.body.newDate;
    const slot = req.body.newSlot;

    
    const schema = {
        email: Joi.string().email().required(),
        oldDayToBeChanged: Joi.string().required(),
        oldDateToBeChanged: Joi.date().required(),
        oldSlotToBeChanged: Joi.string().required(),
        newDay: Joi.string().required(),
        newDate: Joi.date().required(),
        newSlot: Joi.string().required()
    };
    
    const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });


   const interviewsCheck =  interviews.find(
        interviewsCheck => interviewsCheck.interviewerEmail===headEmail &&
        interviewsCheck.day === oldDay &&
        interviewsCheck.date === oldDate &&
        interviewsCheck.interviewslot === oldSlot);
    
  if (interviewsCheck.interview == true ){ return res.status(404).send({err:'Cannot update this slot since you have an interview in'})};
    //console.log(interviewsCheck);
    const headSlot = headFreeSlots.find (headSlot => headSlot.headEmail === headEmail &&
        headSlot.date === oldDate && headSlot.day === oldDay && headSlot.slot === oldSlot);
        
    headSlot.day = day;
    headSlot.date = date;
    headSlot.slot = slot;

    interviewsCheck.day = day;
    interviewsCheck.date = date;
    interviewsCheck.interviewslot = slot;

    res.send (headFreeSlots.filter (headSlot => headSlot.headEmail === headEmail ));
  //  res.send (interviews);
    //res.json({ data: headFreeSlots })
    //res.json({ data: interviews })
});

//router.delete ('/delete/:id', (req, res) => {

//})
*/
module.exports = router;