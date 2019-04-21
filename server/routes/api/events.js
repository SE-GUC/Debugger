const express = require("express");

const router = express.Router();


const Event = require("../../Models/Event");
const EventForm = require("../../Models/EventForm");
const validator = require('../../Validations/EventValidations')

router.get("/", async (req, res) => res.json({ data: await Event.find() }));


router.get("/eventform", async(req, res) => {
  const eventforms = await EventForm.find()
  res.send(`<a href="/api/EventForm">EventForm</a>`);
});





// Create a new event
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const newEvent = await Event.create(req.body);

    return res.json({ data: newEvent });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Delete an Event
router.delete("/:id", async (req, res) => {
  try {
    // await Event.deleteOne(id)
    const id = req.params.id;
    const deletedEvent = await Event.findByIdAndRemove(id);
    res.json({ msg: "Event was deleted successfully", data: deletedEvent });
  } catch (error) {
    res.status(404).send("Event Doesn't exist");
  }
});


// Update an event's info
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const event = await Event.findOne({ _id : id });
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const updatedEvent = await event.updateOne(req.body);
    res.json({ msg: "Event Updated." });
  } catch (error) {
    res.status(404).send(error.message);
  }
});


router.post('/filleventforms', async (req,res) => {

  try {
    //let studentID = (await EventForm.findOne({student_id:req.body.student_id}))
    //if(!studentID) return res.status(400).send(`please enter your national id number `)
   const newEventForm = await EventForm.create(req.body)

   res.json({msg:'Response submitted successfully', data: newEventForm})
   }
   
  
    
    
  
  
  

  catch(error) {

      

    res.send(`error, can't submit response`)

  }  

})


module.exports = router;
