const express = require('express')

const router = express.Router()



// We will be connecting using database 

const EventForm = require('../../models/EventForm')


  router.post('/eventforms', (req, res) => {

    const eventId =req.body.eventId;
    const studentId = req.bosy.studentId;
    const attendeeName = req.body.attendeeName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const IdCardNumber = req.body.IdCardNumber;



	if (!studentId) return res.status(400).send({ err: 'please enter your id number' });

	if (typeof attendeeName !== 'string') return res.status(400).send({ err: 'Invalid value for name' });


	if (typeof phoneNumber !== 'number') return res.status(400).send({ err: 'Invalid value for phonenumber' });



	const newresponse = {

		id: uuid.v4(),
         eventId,
        studentId,
        attendeeName,
        phoneNumberl,
        email,
        IdCardNumber,
	};

	return res.json({ data: newresponse });

});
module.exports = router;   