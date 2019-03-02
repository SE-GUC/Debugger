const express = require('express')
const router = express.Router()

const VGS_User  = require('../../models/VGS_User')

const vgs_users = [
new VGS_User
('kk@yahoo.com','member','nksb','tennis',1998,'member',null,'',null,null,'klkfgkl','fgg')    ];

//router.get('/', (req, res) => res.json({data: vgs_users}));

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

/*router.post('/joi', (req, res) => {
	const email = req.body.name
	const note = req.body.note

	const schema = {
		email: Joi.string().min(3).required(),
		note: Joi.string().min(3).required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const vgs_users = {
		email,
		note,
		
	};
	return res.json({ data: vgs_users });
});*/

module.exports = router;