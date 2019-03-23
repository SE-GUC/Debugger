const Joi = require("joi");
const express = require('express');
const router = express.Router();
const VGS_User = require("../../Models/VGS_User");
const events = require("./events");
const Event = require('../../models/Event')

//const applicants = [];
const eventsList = [

  new Event ('public', 'recruitment booth','1/2/2019'),
  new Event ('private', 'general meeting ','1/3/2019'),
  new Event ('public', 'career advising','1/6/2019'),
 
];
var applicant = new VGS_User();

router.get("/", (req, res) => {
  res.send(`<a href="/api/Application Form">Application Form</a>
            <a href="/api/Events">Events</a>`);
});
router.get('/Events', (req, res) => {
  res.json({ data: eventsList }) 
});

// user filling an application form and we create new VGS user
router
    .route('/application_form')
    .post(async (req, res) => {
        try {

            const applicant = await VGS_User.create(req.body);
            return res.send(applicant)
        }
        catch (error) {
            res.send(`error, we couldn't create the application form`)
        }
    })

// viewing the application form for a user to see his/her status
router
    .route('/application_form_view/:id')
    .get(async (req, res) => {
        try{
            const accpetedApplicant = await VGS_User.findById(req.params.id)
            let status = accpetedApplicant.appStatus
            return res.send(status)
        }
        catch (error){
            return res.send(`error, we couldn't find the application form`)
        }
    })

// viewing all the application forms that are still not accepted nor rejected
router
    .route('/application_forms_view')
    .get(async (req, res) => {
        try {
            const allApplicationForms = await VGS_User.find({appStatus: 'pending'})
            return res.send(allApplicationForms)
        }
        catch (error){
            return res.send(`error, we couldn't get the application forms`)
        }
    })

// update applicant fields
router
    .route('/application_form_update')
    .put(async (req, res) => {
        try{
            let foundApplicant = (await VGS_User.findOne({email:req.body.email}))
            if(!foundApplicant) return res.status(400).send(`the applicant with this email is not found, check the email`)
            else{
                await VGS_User.update({email:req.body.email}, 
                  {
                  email : (req.body.newEmail || foundApplicant.email),
                  clubCommittee : (req.body.clubCommittee || foundApplicant.clubCommittee),
                  hobbies: (req.body.hobbies  || foundApplicant.hobbies), 
                  appliedPosition: (req.body.appliedPosition  || foundApplicant.appliedPosition),
                  gameName : (req.body.gameName  || foundApplicant.gameName)
                  })
            }
            return res.send(foundApplicant)
        }
        catch (error){
            return res.send('error, failed to update')
        }
    })
module.exports=router;

