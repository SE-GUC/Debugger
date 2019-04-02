const express = require("express");

const router = express.Router();



const EventForm = require("../../Models/EventForm");



router.get("/eventform", async(req, res) => {
  const eventforms = await EventForm.find()
  res.json({data: eventforms});
});


  router.get('/:id', (req, res) => {
    const filteredEventId = req.params.id
    const filteredForms = eventforms.filter(filteredForms => filteredForms.eventId === filteredEventId)
    res.send(filteredForms)
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
