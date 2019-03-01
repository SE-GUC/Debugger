const Joi= require('joi')
const uuid= require('uuid')
const express = require('express')
const Application_Form = require('../../Models/Application_Form')
const User = require('../../Models/User')
const VGS_User = require('../../Models/VGS_User')
const router = express.Router()

class applicant{
    constructor(appl, msg){
        this.appl=appl
        this.msg=msg
    }
}

const applicants = []

router.get('/', (req, res) => {
    res.send(`<a href="/api/Application Form">Application Form</a>`)
})

router.post('/application_form', (req, res) => {

    var user = new VGS_User (req.body.email, req.body.clubCommittee);
    user.
   /* const newApplicant = {
        //name: new User = (req.body.name, req.body.phoneNumber, req.body.email, req.body.password, 
           // req.body.birthday),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        studyYear: req.body.studyYear,
        modeOfTran: req.body.modeOfTran,
        generalAddress: req.body.generalAddress,
        clubName: req.body.clubName,
        clubCommittee: req.body.clubCommittee,
        hobbies: req.body.hobbies
    }*/
    //applicants.push(newApplicant)
    //res.send(res.status(200),r);
    res.send(user)
})

router.get('/application_form_view', (req, res) => {

})


/*router.get('/api/testing', (req, res) => {
    res.send('Hola');
})

router.post('/api/application_forms', (req, res) => {
    const newApplicant = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age
    };
    applicants.push(newApplicant);
    res.send('Your Application Form has been submitted ;)');
})*/


//get the requirement fields from whom ever is making the application form

/*router.post('/api/application_requirements', (req, res) => {
    const requires = {
        req1: req.body.req1, 
        req2: req.body.req2, 
        req3: req.body.req3, 
        req4: req.body.req4
    };
    const aRequirement =[requires.req1, requires.req2, requires.req3, requires.req4];
    const required_by = {yourName: req.body.yourName};
    const applicationForm = new Application_Form (aRequirement , required_by);
    res.send(applicationForm);
})

router.get('/api/application_form', (req, res) => {
    const appForm = {
        req1 : applicationForm.aRequirement[0],
        req2 : applicationForm.aRequirement[1],
        req3 : applicationForm.aRequirement[2],
        req4 : applicationForm.aRequirement[3]
    }
    const done =postingAppForm('/api/application_form')
    res.send(appForm, done)
})

function postingAppForm (url) {
    router.post(url, (req, res) => {
        const info = {
            name: req.body.name,
            age: req.body.age,
            studyYear: req.body.studyYear,
            committee: req.body.committee
        }
    })
    return res.send(info, 'done!')
}*/


module.exports = router