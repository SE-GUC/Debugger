const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const sheet = require ("../../Models/Interview ")
const validator = require('../../validations/interviewValidations')


router.put('/:interviewerEmail', async (req,res) => {
    try {
     const interviewerEmail = req.params.interviewerEmail
     const intr = await sheet.findOne({interviewerEmail})
     if(!intr) return res.status(404).send({error: 'InterviewerSlot does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedinterviewSlot = await sheet.updateOne(req.body)
     res.json({msg: 'Interview Slot updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

module.exports = router; 
