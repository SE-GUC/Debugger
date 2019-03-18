const express = require('express');
const Joi = require("joi");
const uuid = require("uuid");

const router = express.Router();
const Application_Form = require("../../Models/Application_Form");
const User = require("../../Models/User");
const VGS_User = require("../../Models/VGS_User");
const events = require("./events");
const Event = require('../../models/Event')
const fs = require("fs");

console.log("hi out of get");

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
router.get('/app',(req,res)=> res.json({data:Users}));

  module.exports=router;

