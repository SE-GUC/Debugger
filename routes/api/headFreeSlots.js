const express = require('express')
const Joi = require('joi')
const uuid = require('uuid')
const router = express.Router()
const mogoose = require('mongoose') 


const Interview = require('../../Models/Interview')
const HeadFreeSlot = require('../../models/HeadFreeSlot')
const User = require ('../../models/User')

router.post ('/add', async(req, res) => {
    try {
    
        const exist = Interview.find()
        if (!exist){
            await Interview.create({
                interviewerEmail: 'ahmed@gmail.com'
            ,   intervieweeEmail: 'mohamed@gmail.com'
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '2nd'
            ,   startTime: '10:00'
            ,   endTime: '10:30'
            ,   interview: true
            })

            await Interview.create({
                interviewerEmail: 'ahmed@gmail.com'
            ,   intervieweeEmail: null
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '3rd'
            ,   startTime: null
            ,   endTime: null
            ,   interview: false
            })

            await Interview.create({
                interviewerEmail: 'tamer@gmail.com'
            ,   intervieweeEmail: null
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '3rd'
            ,   startTime: null
            ,   endTime: null
            ,   interview: false
            })

        }
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
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    
        const headSlot = await HeadFreeSlot.find({ 'headEmail': email
                                                 , 'date': date
                                                 , 'day': day
                                                 , 'slot': slot
        } )/*,(err, result) => {
                                                    if (err) 
                                                        res.status(404).send(err.message)
                                                 })*/
                                             
    
        if (headSlot) return res.status(404).send({err:'Already exists'})

       newFreeSlot = await HeadFreeSlot.create({ headEmail: email
                                                , date: date
                                                , day: day
                                                , slot: slot})
                                                

        newInterview = await Interview.create({ interviewerEmail: email
                                              , intervieweeEmail: null
                                              , day: day
                                              , date: date
                                              , interviewslot: slot
                                              , startTime: null
                                              , endTime: null
                                              , interview: false}/*(err, result) => {
                                                if (err) 
                                                    res.status(404).send(err.message)*/
                                             )
                                             

        const freeSlots = await HeadFreeSlot.find({headEmail: email})
        res.send({data: freeSlots})
    
    }

    catch (error){
        res.status(404).send(error.message);
       
    }
});


// Showing the whole free slots table
/*router.get ('/view', async(req, res) => {
    try {

        const exist = HeadFreeSlot.find()
        if (!exist){
            await HeadFreeSlot.create({
                headEmail: 'ahmed@gmail.com'
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   slot: '2nd'
            })

            await HeadFreeSlot.create({
                headEmail: 'ahmed@gmail.com'
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   slot: '3rd'
            })

            await HeadFreeSlot.create({
                headEmail: 'tamer@gmail.com'
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   slot: '3rd'
            })

        }

        const userEmail = req.body.email

        const schema = {email: Joi.string().email().required()}
        const result = Joi.validate(req.body, schema)
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })

        const freeSlots = await HeadFreeSlot.find({headEmail: userEmail})
        res.send({data: freeSlots})

    }

    catch (error){
        res.status(404).send(error.message)
    }
    
})


// edit my free slots
router.put('/update/',  async(req, res) => {
    try {

        const exist = Interview.find()
        if (!exist){
            await Interview.create({
                interviewerEmail: 'ahmed@gmail.com'
            ,   intervieweeEmail: 'mohamed@gmail.com'
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '2nd'
            ,   startTime: '10:00'
            ,   endTime: '10:30'
            ,   interview: true
            })

            await Interview.create({
                interviewerEmail: 'ahmed@gmail.com'
            ,   intervieweeEmail: null
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '3rd'
            ,   startTime: null
            ,   endTime: null
            ,   interview: false
            })

            await Interview.create({
                interviewerEmail: 'tamer@gmail.com'
            ,   intervieweeEmail: null
            ,   day: 'Monday'
            ,   date: '11-09-2019'
            ,   interviewslot: '3rd'
            ,   startTime: null
            ,   endTime: null
            ,   interview: false
            })

        }
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

    	if (result.error) return res.status(400).send({ error: result.error.details[0].message })


        const interviewsCheck =  await Interview.find({
            interviewerEmail: headEmail
        ,   day: oldDay
        ,   date: oldDate
        ,   interviewslot: oldSlot
        })
    
        if (interviewsCheck.interview == true )
           return res.status(404).send({err:'Cannot update this slot since you have an interview in'})
    //console.log(interviewsCheck);
        const oldOne = { 
          headEmail: { $eq: headEmail }
        , day: { $eq: oldDay }
        , date: { $eq: oldDate }
        , slot: { $eq: oldSlot }
        }

        const newOne = { $set: { day: day
                               , date: date
                               , slot: slot 
                               }
                        }
        const updated = await HeadFreeSlot.updateOne(oldOne, newOne, (err, result) => {
           if (err) 
               res.status(404).send(err.message)
        })
    
        oldInterview = { 
          interviewerEmail: { $eq: headEmail }
        , day: { $eq: oldDay }
        , date: { $eq: oldDate }
        , interviewslot: { $eq: oldSlot }
        }
    
        newInterview = { $set: { day: day
                               , date: date
                               , interviewslot: slot 
                               }
                        }
        const updatedInterviews = await Interview.updateOne(oldInterview, newInterview, (err, result) => {
          if (err) 
             res.status(404).send(err.message)
        })

        const freeSlots = await HeadFreeSlot.find({headEmail: email})
        const showInterview = await Interview.find()
        res.send({data: freeSlots, data: showInterview})
    }

    catch (error){
        res.status(404).send(error.message);
    }
  
});

//router.delete ('/delete/:id', (req, res) => {

//})
*/
module.exports = router;