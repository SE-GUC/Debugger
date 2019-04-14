const express = require("express");

const router = express.Router();



const EventForm = require("../../Models/EventForm");



router.get("/", async (req, res) => res.json({ data: await EventForm.find() }));


router.get("/:id", async (req, res) => res.json({ data: await EventForm.findOne({id : id}) }));


router.post('/:id', async (req, res) => {

  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const event_id = req.body.id;
    const user_id = req.params.id;
    const attendeeName = req.body.attendeeName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const IdCardNumber = req.body.IdCardNumber;
   

  if (!user_id)
    return res.status(400).send({ err: "please enter your id number" });

  if (typeof attendeeName !== "string")
    return res.status(400).send({ err: "Invalid value for name" });

  if (typeof phoneNumber !== "number")
    return res.status(400).send({ err: "Invalid value for phonenumber" });
  
    const newresponse = {
      event_id,
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



router.post('/eventforms', async (req,res) => {

  try {

    let studentID = (await EventForm.findOne({student_id:req.body.student_id}))
    if(!studentID) return res.status(400).send(`please enter your national id number `)
   const newEventForm = await EventForm.create(req.body)

   res.json({msg:'Response submitted successfully', data: newEventForm})

  }

  catch(error) {

      

    res.send(`error, can't submit response`)

  }  

})


module.exports = router;
