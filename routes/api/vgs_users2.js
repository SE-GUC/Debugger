/*
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();


const VGS_User = require('../../models/VGS_User');

// committees' names
// id vs email
const vgs_users = [
    new VGS_User('ghada@gmail.com','Member','HR','Playing Volleyball','2016','HR Member','Accepted', 
    null, null, null, null, false),
    new VGS_User('amany@hotmail.com', 'Member', 'GDD', 'Developing games', '2014', 'GDD Member',
    'Accepted', null, null, null, null, true ),
    new VGS_User('Jim@yahoo.com',null,null, null, null,null ,'Rejected', 
    null, null, null, null, false),
    new VGS_User('ehab@hotmail.com', 'Advisor', 'GDD', 'Coding', '2012', 'GDD Advisor',
    'Accepted', null, null, null, null, false )
];

// Showing all users
//router.get ('/', (req, res) => res.json({ data: vgs_users }));

// Assigning the booth member
router.put('/assign', (req, res) => {
    const memberEmail = req.body.email;  //req.body.id

    const schema = {
        email: Joi.string().email().required()};

    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const user = vgs_users.find(user => user.email === memberEmail);
    
    // checking if he is already a booth member
    if (user.boothMember === true ) return res.status(404).send({err:('This member is already a booth member')});

    // checking if he is even accepted
    if (user.appStatus === 'Rejected' ) return res.status(404).send({err:'This applicant was rejected and is not a member in the club'});

    // checking if he is a member
    if (user.userType !== 'Member' && user.userType !== 'Recruit' ) 
    return res.status(404).send({err: ('This person position is not member')});

    user.boothMember = true;
    res.send(vgs_users);
});

module.exports = router;
*/