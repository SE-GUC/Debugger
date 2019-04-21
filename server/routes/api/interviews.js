
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const mongoose = require('mongoose')
//const sheet = require ("../../Models/Interview")

const validator = require('../../Validations/interviewValidations')
const Interview = require('../../Models/Interview')

router.put('/interview/:interviewerEmail', async (req, res) => {

    try {

        const interviewerEmail = req.params.interviewerEmail
        const intr = await Interview.findOne({ interviewerEmail })
        if (!intr) return res.status(404).send({ error: 'InterviewerSlot does not exist' })
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedinterviewSlot = await Interview.updateOne(req.body)

        res.json({ msg: 'Interview Slot updated successfully' })

    }

    catch (error) {

        // We will be handling the error later
        return res.send(error.message)
    }

})

// Showing the whole interview sheet
router.get('/', async (req, res) => {

    try {
        
        const interviews = await Interview.find()
        res.send(interviews)

    }

    catch (error) {

        return res.status(404).send(error.message)

    }

});

// book/ change interview times
router.put('/edit', async (req, res) => {

    try {


        const interviewerEmail = req.body.interviewerEmail
        const day = req.body.day
        const date = req.body.date
        const slot = req.body.slot
        const newIntervieweeEmail = req.body.intervieweeEmail
        const newStartTime = req.body.startTime
        const newEndTime = req.body.endTime
        const newInterview = req.body.interview

        const schema = {

            interviewerEmail: Joi.string().email().required()
            , day: Joi.string().required()
            , date: Joi.date().required()
            , slot: Joi.string().required()
            , intervieweeEmail: Joi.string().email().required()
            , startTime: Joi.string().required()
            , endTime: Joi.string().required()
            , interview: Joi.bool().required()

        };

        const result = Joi.validate(req.body, schema)

        if (result.error)
            return res.status(400).send(result.error.details[0].message )

        const interviewsCheck = await Interview.findOne({

            interviewerEmail: interviewerEmail
            , day: day
            , date: date
            , interviewslot: slot

        })

        if (!interviewsCheck || interviewsCheck == false)
            return res.status(404).send('Does not exist' )

        const oldInterview = {

            interviewerEmail: { $eq: interviewerEmail }
            , day: { $eq: day }
            , date: { $eq: date }
            , interviewslot: { $eq: slot }

        }

        const newInt = {
            $set: {

                intervieweeEmail: newIntervieweeEmail
                , startTime: newStartTime
                , endTime: newEndTime
                , interview: newInterview

            }
        }

        await Interview.update(oldInterview, newInt, (err, result) => {

            if (err)
                return res.status(404).send(err.message)

        })

        const updated = await Interview.find()
        res.send(updated);

    }

    catch (error) {

        return res.status(404).send(error.message)

    }

})

module.exports = router