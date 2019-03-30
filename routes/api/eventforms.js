const express = require("express");
const router = express.Router();

import EventSchema from Event;
import UserSchema from User;



// We will be connecting using database

const EventForm = require("../../Models/EventForm");

// const eventforms = [
//   new EventForm("15e516bf-dad0-4421-accb-dc20f9806275", "15e0dfa1-ae7c-4d18-9115-5254c686942d", "Amina Sedky", "55555", "aminasedky@gmail.com","29765452110034"),
//   new EventForm("15e516bf-dad0-4421-accb-dc20f9806275", "25b0ffa4-fe0d-4642-9686-e7209bf7758b", "Sara Walid", "665555", "sara@gmail.com","28165562145034"),
//   new EventForm("8a36c3b8-7b7b-4c53-9dd2-f5af5345f15f", "15e0dfa1-ae7c-4d18-9115-5254c686942d", "Amina Sedky", "55555", "aminasedky@gmail.com","29765452110034")
// ];

// router.get('/', (req, res) => {
//   res.json({ data: eventforms })
//   });
  
//   router.get('/:id', (req, res) => {
//     const filteredEventId = req.params.id
//     const filteredForms = eventforms.filter(filteredForms => filteredForms.eventId === filteredEventId)
//     res.send(filteredForms)
// })

router.get("/", async (req, res) => res.json({ data: await EventForm.find() }));

router.get("/:id", async (req, res) => res.json({ data: await EventForm.findOne({id : id}) }));

router.post('/', async (req, res) => {

  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const event_eventName = EventSchema.event_eventName;
    const user_id = UserSchema.id;
    const attendeeName = req.body.attendeeName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const IdCardNumber = req.body.IdCardNumber;
   
    if (!studentId)
    return res.status(400).send({ err: "please enter your id number" });

  if (typeof attendeeName !== "string")
    return res.status(400).send({ err: "Invalid value for name" });

  if (typeof phoneNumber !== "number")
    return res.status(400).send({ err: "Invalid value for phonenumber" });
  
    const newresponse = {
      event_eventName,
      user_id,
      attendeeName,
      phoneNumberl,
      email,
      IdCardNumber
    };
    
 return res.json({ data: newresponse });

  }
  catch (error) {
    res.status(404).send(error.message)
 }

})

// router.post("/eventforms", (req, res) => {
//   const eventId = req.body.eventId;
//   const studentId = req.bosy.studentId;
  // const attendeeName = req.body.attendeeName;
  // const phoneNumber = req.body.phoneNumber;
  // const email = req.body.email;
  // const IdCardNumber = req.body.IdCardNumber;

  // if (!studentId)
  //   return res.status(400).send({ err: "please enter your id number" });

  // if (typeof attendeeName !== "string")
  //   return res.status(400).send({ err: "Invalid value for name" });

  // if (typeof phoneNumber !== "number")
  //   return res.status(400).send({ err: "Invalid value for phonenumber" });

  // const newresponse = {
  //   id: uuid.v4(),
  //   eventId,
  //   studentId,
  //   attendeeName,
  //   phoneNumberl,
  //   email,
  //   IdCardNumber
  // };

//   return res.json({ data: newresponse });
// });
module.exports = router;
