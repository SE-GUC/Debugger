const express = require("express");

const router = express.Router();


const Event = require("../../Models/Event");
const EventForm = require("../../Models/EventForm");

/*const events = [
  new Event("public", "recruitment booth", "1/2/2019"),
  new Event("private", "general meeting ", "1/3/2019"),
  new Event("public", "career advising", "1/6/2019")
];*/

router.get('/', async (req,res) => {
  const events = await Event.find()
  res.json({data: events})
})
//res.send(`<a href="/api/EventForm">EventForm</a>`)

router.get("/eventform", async(req, res) => {
  const eventforms = await EventForm.find()
  res.send(`<a href="/api/EventForm">EventForm</a>`);
});





// Create a new event
router.post("/", (req, res) => {
  const eventType = req.body.eventType;
  const description = req.body.description;
  const date = req.body.date;

  if (!description)
    return res.status(400).send({ err: "description field is required" });
  if (typeof description !== "string")
    return res.status(400).send({ err: "Invalid value for description" });

  if (!date) return res.status(400).send({ err: "date field is required" });
  if (typeof date !== "string")
    return res.status(400).send({ err: "Invalid value for date" });

  if (!eventType)
    return res.status(400).send({ err: "Event Type field is required" });
  if (typeof eventType !== "string")
    return res.status(400).send({ err: "Invalid value for Event Type" });

  const newEvent = {
    eventType,
    description,
    date,
    id: uuid.v4()
  };
  events.push(newEvent);
  res.send(events);

  //   return res.json({ data: newEvent });
});

// Delete an Event
router.delete('/:id', (req, res) => {
    const eventId = req.params.id 
    const event = events.find(event => event.id === eventId)
    const index = events.indexOf(event)
    events.splice(index,1)
    res.send(events)
});

// Update an event's info
// router.put('/:id', (req, res) => {
//   const eventId = req.params.id 
//   const updatedEventType = req.body.eventType
//   const updatedDescription = req.body.description
//   const updatedDate = req.body.date
//   const event = events.find(event => event.id === eventId)
//   event.eventType = updatedEventType
//   event.description = updatedDescription
//   event.date = updatedDate
//   res.send(events)
// });
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
