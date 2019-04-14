
const express = require('express')
const Joi = require('joi')
const uuid = require('uuid')
const router = express.Router()
const mogoose = require('mongoose')

const Interview = require('../../Models/Interview')
const HeadFreeSlot = require('../../Models/HeadFreeSlot')
const User = require('../../Models/User')

//Adding a new row to HeadFreeSlot and Interview
router.post('/add', async (req, res) => {

    try {
        
        
        const email = req.body.email
        const day = req.body.day
        const date = req.body.date
        const slot = req.body.slot

        const schema = {

            email: Joi.string().email().required(),
            day: Joi.string().required(),
            date: Joi.date().required(),
            slot: Joi.string().required()

        };

        const result = Joi.validate(req.body, schema)
        if (result.error) return res.status(400).send(result.error.details[0].message )

        const headSlot = await HeadFreeSlot.findOne({
            headEmail: email
            , date: date
            , day: day
            , slot: slot
        })

       if (headSlot) return res.status(404).send( {error :"Already exists"})

        newFreeSlot = await HeadFreeSlot.create({
            headEmail: email
            , date: date
            , day: day
            , slot: slot
        })

        newInterview = await Interview.create({
            interviewerEmail: email
            , intervieweeEmail: null
            , day: day
            , date: date
            , interviewslot: slot
            , startTime: null
            , endTime: null
            , interview: false
        })

        const freeSlots = await HeadFreeSlot.find({headEmail: email})
        const interviews = await Interview.find()
        console.log(interviews)
        res.send(freeSlots)

    }

    catch (error) {

        res.status(404).send(error.message);

    }

});

//Showing the whole free slots table
router.get('/:email', async (req, res) => {
   
    try {
        
        const userEmail = req.params.email
        const freeSlots = await HeadFreeSlot.find({ headEmail: userEmail })
        res.send(freeSlots)

    }

    catch (error) {

        res.status(404).send(error.message)

    }

})

// edit my free slots
router.put('/update/', async (req, res) => {

    try {

        

        const headEmail = req.body.email
        const oldDay = req.body.oldDayToBeChanged
        const oldDate = req.body.oldDateToBeChanged
        const oldSlot = req.body.oldSlotToBeChanged
        const day = req.body.newDay
        const date = req.body.newDate
        const slot = req.body.newSlot

        const schema = {

            email: Joi.string().email().required(),
            oldDayToBeChanged: Joi.string().required(),
            oldDateToBeChanged: Joi.date().required(),
            oldSlotToBeChanged: Joi.string().required(),
            newDay: Joi.string().required(),
            newDate: Joi.date().required(),
            newSlot: Joi.string().required()

        }

        const result = Joi.validate(req.body, schema)

        if (result.error) return res.status(400).send(result.error.details[0].message )

        const check = await HeadFreeSlot.findOne({

            headEmail: headEmail
            , day: oldDay
            , date: oldDate
            , slot: oldSlot

        })

        if (check == false || !check)
            return res.status(404).send('Cannot update this slot since it does not exist')

        const interviewsCheck = await Interview.findOne({

            interviewerEmail: headEmail
            , day: oldDay
            , date: oldDate
            , interviewslot: oldSlot

        })

        if (interviewsCheck.interview == true)
            return res.status(404).send('Cannot update this slot since you have an interview in')

        const oldOne = {

            headEmail: { $eq: headEmail }
            , day: { $eq: oldDay }
            , date: { $eq: oldDate }
            , slot: { $eq: oldSlot }
        }

        const newOne = {
            $set: {
                day: day
                , date: date
                , slot: slot
            }

        }

        const updated = await HeadFreeSlot.updateOne(oldOne, newOne, (err, result) => {

            if (err)
                return res.status(404).send(err.message)

        })

        oldInterview = {

            interviewerEmail: { $eq: headEmail }
            , day: { $eq: oldDay }
            , date: { $eq: oldDate }
            , interviewslot: { $eq: oldSlot }

        }

        newInterview = {
            $set: {
                day: day
                , date: date
                , interviewslot: slot
            }
        }

        const updatedInterviews = await Interview.updateOne(oldInterview, newInterview, (err, result) => {

            if (err)

                return res.status(404).send(err.message)

        })

        const freeSlots = await HeadFreeSlot.find({ headEmail: headEmail })
        const showInterview = await Interview.find()
        console.log(showInterview)
        res.send(freeSlots)

    }

    catch (error) {

        res.status(404).send(error.message);

    }

});

//router.delete ('/delete/:id', (req, res) => {

//})

module.exports = router;