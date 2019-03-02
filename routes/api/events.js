const express = require('express')
const uuid = require('uuid')
const router = express.Router()



// We will be connecting using database 

const Event = require('../../models/Event')
const EventForm = require('../../models/EventForm')

const events = [

    new Event ('public', 'recruitment booth','1/2/2019'),
    new Event ('private', 'general meeting ','1/3/2019'),
    new Event ('public', 'career advising','1/6/2019'),
   
];

router.get('/', (req, res) => {
    res.json({ data: events })
    
    });
    //res.send(`<a href="/api/EventForm">EventForm</a>`)

router.get('/eventform',(req, res) => {
res.send(`<a href="/api/EventForm">EventForm</a>`);

}) ;


  router.post('/filleventforms', (req, res) => {
    const eventId =req.body.eventId;
    const studentId = req.body.studentId;
    const attendeeName = req.body.attendeeName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const IdCardNumber = req.body.IdCardNumber;



	if (!studentId) return res.status(400).send({ err: 'please enter your id number' });

	if (typeof attendeeName !== 'string') return res.status(400).send({ err: 'Invalid value for name' });


	//if (typeof phoneNumber !== 'number') return res.status(400).send({ err: 'Invalid value for phonenumber' });



	const newresponse = {

		id: uuid.v4(),
         eventId,
        studentId,
        attendeeName,
        phoneNumber,
        email,
        IdCardNumber,
	};

	return res.json({ data: newresponse });

});

module.exports= router;

