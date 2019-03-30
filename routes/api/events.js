const express = require("express");
// const uuid = require("uuid");
const router = express.Router();

// We will be connecting using database

const Event = require("../../Models/Event");
// const EventForm = require("../../Models/EventForm");

// const events = [
//   new Event("public", "recruitment booth", "1/2/2019"),
//   new Event("private", "general meeting ", "1/3/2019"),
//   new Event("public", "career advising", "1/6/2019")
// ];

// router.get("/", (req, res) => {
//   res.json({ data: events });
// });
//res.send(`<a href="/api/EventForm">EventForm</a>`)

// router.get("/eventform", (req, res) => {
//   res.send(`<a href="/api/EventForm">EventForm</a>`);
// });

router.get("/", async (req, res) => res.json({ data: await Event.find() }));

router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const eventName = req.body.eventName;
    const eventType = req.body.eventType;
    const description = req.body.description;
    const date = req.body.date;

    if (!eventName)
      return res.status(400).send({ err: "event Name field is required" });
    if (typeof description !== "string")
      return res.status(400).send({ err: "Invalid value for event Name" });

    if (!description)
      return res.status(400).send({ err: "description field is required" });
    if (typeof description !== "string")
      return res.status(400).send({ err: "Invalid value for description" });

    if (!date) return res.status(400).send({ err: "date field is required" });
    if (typeof date !== "date")
      return res.status(400).send({ err: "Invalid value for date" });

    if (!eventType)
      return res.status(400).send({ err: "Event Type field is required" });
    if (typeof eventType !== "string")
      return res.status(400).send({ err: "Invalid value for Event Type" });

    const newEvent = {
      eventName,
      eventType,
      description,
      date
    };
    events.push(newEvent);
    res.send(events);

    return res.json({ data: newEvent });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Create a new event
// router.post("/", (req, res) => {
//   const eventType = req.body.eventType;
//   const description = req.body.description;
//   const date = req.body.date;

//   if (!description)
//     return res.status(400).send({ err: "description field is required" });
//   if (typeof description !== "string")
//     return res.status(400).send({ err: "Invalid value for description" });

//   if (!date) return res.status(400).send({ err: "date field is required" });
//   if (typeof date !== "string")
//     return res.status(400).send({ err: "Invalid value for date" });

//   if (!eventType)
//     return res.status(400).send({ err: "Event Type field is required" });
//   if (typeof eventType !== "string")
//     return res.status(400).send({ err: "Invalid value for Event Type" });

//   const newEvent = {
//     eventType,
//     description,
//     date,
//     id: uuid.v4()
//   };
//   events.push(newEvent);
//   res.send(events);

//   //   return res.json({ data: newEvent });
// });

// Delete an Event
router.delete("/", async (req, res) =>
  res.json({ data: await Event.splice(index, 1) })
);

// Delete an Event
// router.delete('/:id', (req, res) => {
//     const eventId = req.params.id
//     const event = events.find(event => event.id === eventId)
//     const index = events.indexOf(event)
//     events.splice(index,1)
//     res.send(events)
// });

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

// router.post("/filleventforms", (req, res) => {
//   const eventId = req.body.eventId;
//   const studentId = req.body.studentId;
//   const attendeeName = req.body.attendeeName;
//   const phoneNumber = req.body.phoneNumber;
//   const email = req.body.email;
//   const IdCardNumber = req.body.IdCardNumber;

//   if (!studentId)
//     return res.status(400).send({ err: "please enter your id number" });

//   if (typeof attendeeName !== "string")
//     return res.status(400).send({ err: "Invalid value for name" });

//   //if (typeof phoneNumber !== 'number') return res.status(400).send({ err: 'Invalid value for phonenumber' });

//   const newresponse = {
//     id: uuid.v4(),
//     eventId,
//     studentId,
//     attendeeName,
//     phoneNumber,
//     email,
//     IdCardNumber
//   };

//   return res.json({ data: newresponse });
// });

module.exports = router;
