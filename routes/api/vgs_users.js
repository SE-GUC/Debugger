/*
const express = require('express')
const router = express.Router()

const VGS_User  = require('../../models/VGS_User')

const vgs_users = [
new VGS_User
('kk@yahoo.com','member','nksb','tennis',1998,'member',null,'',null,null,'klkfgkl','fgg')    ];


router.post('/note', (req, res) => {
	const email = req.body.email;
	const note = req.body.note;


    if (!email) return res.status(400).send({ err: 'email field is required' });
	if (!note) return res.status(400).send({ err: 'note field is required' });
	if (typeof note !== 'string') return res.status(400).send({ err: 'Invalid value for note' });

    const us = vgs_users.find(e => e.email == req.body.email);
    if (!us) return res.status(400).send({ err: 'invalid email' });
    us.notes = req.body.note;

	res.send(us);
});


module.exports = router;
*/