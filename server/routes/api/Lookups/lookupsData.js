const express = require("express");
const router = express.Router();

const UserTypes = require("../../../Models/Lookups/UserTypes");
const Clubs = require("../../../Models/Lookups/Clubs");
const StudyYear = require('../../../Models/Lookups/StudyYear');
const AppStatus = require('../../../Models/Lookups/AppStatus');
const Transportation = require('../../../Models/Lookups/Transportation');

//#region user Types lookup
router.route("/createUserTypes").post(async (req, res) => {
  try {
    const _userType = await UserTypes.create(req.body);
    return res.send(_userType);
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error, couldn't create the user types` });
  }
});

router.route("/Usertypes").get(async (req, res) => {
  try {
    const _userTypes = await UserTypes.find();
    return res.send(_userTypes);
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error, couldn't get the user types` });
  }
});

router.route("/certainUserType/:userTypeCode").get(async (req, res) => {
  try {
    const _userTypes = await UserTypes.find({
      UserTypeCode: req.params.userTypeCode
    });
    return res.send(_userTypes);
  } catch (error) {
    return res.status(404).json({ error: `Error, couldn't get the user type` });
  }
});
//#endregion

//#region clubs lookup
router.route("/createClubs").post(async (req, res) => {
  try {
    const _clubs = await Clubs.create(req.body);
    return res.send(_clubs);
  } catch (error) {
    return res.status(400).json({ error: `Error, couldn't create the Clubs` });
  }
});

router.route("/Clubs").get(async (req, res) => {
  try {
    const _clubs = await Clubs.find();
    return res.send(_clubs);
  } catch (error) {
    return res.status(404).json({ error: `Error, couldn't get the Clubs` });
  }
});

router.route("/certainClub/:clubCode").get(async (req, res) => {
  try {
    const _clubs = await Clubs.find({ clubCode: req.params.clubCode });
    return res.send(_clubs);
  } catch (error) {
    return res.status(404).json({ error: `Error, couldn't get the club` });
  }
});
//#endregion

//#region study year lookup
router
    .route('/createStudyYears')
    .post(async (req, res)=>{
        try{
            const _studyYear = await StudyYear.create(req.body)
            return res.send(_studyYear)
        }
        catch(error){
            return res.status(400).json({ error: `Error, couldn't create the study year`})
        }
    })

router
    .route('/StudyYear')
    .get(async (req, res)=>{
        try{
            const _studyYear = await StudyYear.find()
            return res.send(_studyYear)
        }
        catch(error){
          return res.status(404).json({ error: `Error, couldn't get the study year`})
        }
    })

router
    .route('/certainStudyYear/:StudyYearCode')
    .get(async (req, res)=>{
        try{
            const _studyYear = await StudyYear.find({"StudyYearCode": req.params.StudyYearCode} )
            return res.send(_studyYear)
        }
        catch(error){
            return res.status(404).json({ error: `Error, couldn't get the study year`})
        }
    })
//#endregion

//#region App status lookup
router
    .route('/createAppStatus')
    .post(async (req, res)=>{
        try{
            const _appStatus = await AppStatus.create(req.body)
            return res.send(_appStatus)
        }
        catch(error){
            return res.status(400).json({ error: `Error, couldn't create the app status`})
        }
    })

router
    .route('/AppStatus')
    .get(async (req, res)=>{
        try{
            const _appStatus = await AppStatus.find()
            return res.send(_appStatus)
        }
        catch(error){
            return res.status(404).json({ error: `Error, couldn't get the app status`})
        }
    })

router
    .route('/certainAppStatus/:AppStatusCode')
    .get(async (req, res)=>{
        try{
            const _appStatus = await AppStatus.find({"AppStatusCode": req.params.AppStatusCode} )
            return res.send(_appStatus)
        }
        catch(error){
            return res.status(404).json({ error: `Error, couldn't get the app status`})
        }
    })
//#endregion

//#region Transportation lookup
router
    .route('/createTransportation')
    .post(async (req, res)=>{
        try{
            const _transportation = await Transportation.create(req.body)
            return res.send(_transportation)
        }
        catch(error){
            return res.status(400).json({ error: `Error, couldn't create the Transportation`})
        }
    })

router
    .route('/Transportation')
    .get(async (req, res)=>{
        try{
            const _transportation = await Transportation.find()
            return res.send(_transportation)
        }
        catch(error){
            return res.status(404).json({ error: `Error, couldn't get the Transportation`})
        }
    })

router
    .route('/certainTransportation/:TransportationCode')
    .get(async (req, res)=>{
        try{
            const _transportation = await Transportation.find({"TransportationCode": req.params.TransportationCode} )
            return res.send(_transportation)
        }
        catch(error){
          return res.status(404).json({ error: `Error, couldn't get the Transportation`})
        }
    })
//#endregion

module.exports = router;
