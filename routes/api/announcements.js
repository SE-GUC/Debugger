const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const announce = require("../../Models/Announcement");
const validator = require('../../validations/announcementValidations')



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


router.get('/get', async (req,res) => {
    const announcem = await announce.find()
    res.json({data: announcem})
})
module.exports = router ;