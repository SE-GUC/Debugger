const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const FAQ = require('../../Models/FAQ')
const validator = require('../../NValidations/ValidationsFAQ')

router
    .route('/create_faq')
    .post(async (req, res)=>{
        try{
            const faq = await FAQ.create(req.body);
            return res.send(faq)
        }
        catch(err){
            res.send(`error, can't create faq`)
        }
    })

router
    .route('/getFaqs')
    .get(async (req, res)=>{
        try{
            let faqs = await FAQ.find()
            return res.send(faqs)
        }
        catch{
            res.send(`error, can't get faqs`)
        }
    })

router
    .route('/edit_faq/:id')
    .put(async (req, res)=>{
        try{
            let createdFaq = await FAQ.findById(req.params.id)
            await FAQ.update({_id: req.params.id},{
                question: (req.body.question || createdFaq.question),
                askedBy: (req.body.askedBy || createdFaq.askedBy),
                noOfTimes: (req.body.noOfTimes || createdFaq.noOfTimes),
                answer:(req.body.answer || createdFaq.answer),
                answeredBy: (req.body.answeredBy || createdFaq.answeredBy),
                date: (req.body.date || createdFaq.date)
            })
            return res.send('done updating')

        }
        catch(err){
            res.status(400).send("cannot edit faq")
        }
    }) 

module.exports = router