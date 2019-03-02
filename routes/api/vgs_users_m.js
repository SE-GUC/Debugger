const Joi = require("joi");
const uuid = require("uuid");
const express = require("express");
const Application_Form = require("../../Models/Application_Form");
const User = require("../../Models/User");
const VGS_User = require("../../Models/VGS_User");
const events = require("./events");
const Event = require('../../models/Event')
const router = express.Router();
const fs = require("fs");

console.log("hi out of get");

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

//router.use("/Event", events);

router.post("/application_form", (req, res) => {
  applicant.email = req.body.email;
  applicant.clubCommittee = req.body.clubCommittee;
  applicant.hobbies = req.body.hobbies;
  applicant.appliedPosition = req.body.appliedPosition;
  applicant.gameName = req.body.gameName;

  let rawdata = fs.readFileSync(`Applicants.json`);
  let applicants = JSON.parse(rawdata);

  applicants.push(applicant);

  fs.writeFileSync("Applicants.json", JSON.stringify(applicants));

  res.send(applicant);

  //#region
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
    }*/ //applicants.push(newApplicant)
  //#endregion
});

router.get("/application_form_view", (req, res) => {
  let rawdata = fs.readFileSync(`Users.json`);
  let applicants = JSON.parse(rawdata);

  //var accpetedApplicatns = applicants.filter(x => x.appStatus == "Complete" && x.name == "Ghada");

  var accpetedApplicatns = applicants.filter(function(item) {
    return item.appStatus != "" && item.email == "koela_@ee.com";
  });
  res.send(accpetedApplicatns.length > 0 ? accpetedApplicatns : "no matches");
});

router.put("/application_form_update", (req, res) => {
  let rawdata = fs.readFileSync(`Applicants.json`);
  let applicants = JSON.parse(rawdata);

  var findingApp = applicants.find(app => app.email == req.body.email);

  if (findingApp != null) {
    applicants = applicants.filter(app => app.email != req.body.email);

    findingApp.email =
      req.body.NewEmail == "" || null ? findingApp.email : req.body.NewEmail;
    findingApp.clubCommittee = req.body.clubCommittee;
    findingApp.hobbies = req.body.hobbies;
    findingApp.appliedPosition = req.body.appliedPosition;
    findingApp.gameName = req.body.gameName;

    applicants.push(findingApp);

    fs.writeFileSync("Applicants.json", JSON.stringify(applicants));
    res.send("Done!");
  }
  else
  {
    res.send("error occurred");
  }
});


//#region
/*router.get('/api/testing', (req, res) => {
    res.send('Hola');
})

router.post('/api/application_forms', (req, res) => {
    const newApplicant = {
        id: uuid.v4(),`
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
//#endregion

module.exports = router;
