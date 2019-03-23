const express = require('express')
const router = express.Router()

const VGS_User  = require('../../models/VGS_User')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
const newUser = {
       email:'m.abdelazem@email.com',
       userType:"normal",
       clubCommittee:"blah0",
       hobbies:['gymnastics','walking'],
       VGSYear: new Date(),
       appliedPosition:'string',
}

// Create the schema
const VGS_UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    clubCommittee: {
        type: String, 
        required: true
    },
    hobbies: {
        type: [String], 
        required: true
    },
    VGSYear: {
        type: Date,
        required: true
    },
    
    appliedPosition: {
        type: String,
        required: false
    },
    
    appStatus: {
        type: String,
        required: false
    },
    
    notes: {
        type: String,
        required: false
    },
    
    gameName: {
        type: String,
        required: false
    },
    gameScrSho: {
        type: String, 
        required: false
    },
    downloadLink: {
        type: String, 
        required: false
    },
    boothMember: {
        type: String, 
        required: false
    }
})
module.exports = vgsUsers = mongoose.model('vgsUsers', VGS_UserSchema)
        const addUser = new vgsUsers(newUser)
        addUser.save(function (err, addUser) {
                    if (err) return console.error(err);
                        console.log('here')
                  });

                  vgsUsers.find(function (err, users) {
                    if (err) return console.error(err);
                    console.log('users',users);
                  })

                  var query = { userType:"normal" };

                  vgsUsers.deleteOne(query, function (err, result) {
              
                      if (err) {
              
                          console.log("error query");
              
                      } else {
              
                          console.log(result);
              
                      }
              
                  });

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