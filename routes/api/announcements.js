const express = require("express");
const router = express.Router();
import AnnouncementSchema from Announcement;

const announce = require("../../Models/Announcement");

const annoucem = [
    new announce ("VGS" , "me" , "you" , null , "event" , null , "17" )
];

router.get('/', (req, res) => res.json({data: annoucem}));
router.post('/', async (req,res) => {

    try {
 
     const isValidated = validator.createValidation(req.body)
 
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
 
     const newAnnouncement = await Announcement.create(req.body)
 
     res.json({msg:'announcement was posted successfully', data: newAnnouncement})
 
    }
 
    catch(error) {
 
        // We will be handling the error later
 
        console.log(error)
 
    }  
 
 })


module.exports = router ;