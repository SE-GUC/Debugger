const express = require("express");

const router = express.Router();


const Event = require("../../Models/Event");
const EventForm = require("../../Models/EventForm");
const validator = require('../../Validations/EventValidations')

router.get("/", async (req, res) => res.json({ data: await Event.find() }));



  

//res.send(`<a href="/api/EventForm">EventForm</a>`)

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

    res.json({ msg: "Event was created successfully", data: newEvent });
  } catch (error) {
    res.send(`error, we couldn't create Event`);
  }
});
// Update an event's info
router.put("/", async (req, res) => {
  try {
    const validation = validator.updateValidation(req.body);
    if (validation.error)
      return res
        .status(400)
        .send({ error: validation.error.details[0].message });

    const foundEvent = await Event.findOne({ eventName: eventName });
    if (foundEvent == false || !foundEvent)
      return res.status(404).send({ error: "Event does not exist" });

    const newEventName = { eventName: { $eq: req.body.eventName } };
    const nwqEventType = { eventType: { $eq: req.body.eventType } };
    const newDescription = { description: { $eq: req.body.description } };
    const newDate = { date: { $eq: req.body.date } };

    if (!newEventName)
      return res.status(400).send({ err: "event Name field is required" });
    if (typeof newEventName !== "string")
      return res.status(400).send({ err: "Invalid value for event Name" });

    if (!nwqEventType)
      return res.status(400).send({ err: "Event Type field is required" });
    if (typeof nwqEventType !== "string")
      return res.status(400).send({ err: "Invalid value for Event Type" });

    if (!newDescription)
      return res.status(400).send({ err: "description field is required" });
    if (typeof newDescription !== "string")
      return res.status(400).send({ err: "Invalid value for description" });

    if (!newDate)
      return res.status(400).send({ err: "date field is required" });
    if (typeof newDate !== "date")
      return res.status(400).send({ err: "Invalid value for date" });

    const updated = await Event.updateOne(
      newEventName,
      nwqEventType,
      newDescription,
      newDate,
      (err, result) => {
        if (err) res.status(404).send(err.message);
      }
    );

    const newEvent = await Event.findOne({ eventName: eventName });
    res.json({ msg: "Event Updated.", data: newEvent });
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
