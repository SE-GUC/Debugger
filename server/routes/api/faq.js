const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const FAQ = require('../../Models/FAQ')
const validator = require('../../Validations/ValidationsFAQ')

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
    .route('/edit_faq')
    .put(async (req, res)=>{
        try{
            let date =await FAQ.findOne({date:req.body.date},{answeredBy:req.body.answeredBy})
           // let answeredBy = await FAQ.findOne()
            await FAQ.updateOne({_id:date._id},{
                question: (req.body.question || createdFaq.question),
                askedBy: (req.body.askedBy || createdFaq.askedBy),
                noOfTimes: (req.body.noOfTimes || createdFaq.noOfTimes),
                answer:(req.body.answer || createdFaq.answer),
                
            })
            return res.send('done updating')

        }
        catch(err){
            res.status(400).send("cannot edit faq")
        }
    }) 




    // router.delete('/:id', async (req,res) => {
    //     try {
    //      const id = req.params.id
    //      const deletedFaq = await User.findByIdAndRemove(id)
    //      res.json({msg:' deleted successfully', data: deletedUser})
    //     }
    //     catch(error) {
    //         // We will be handling the error later
    //         console.log(error)
    //     }  
    //  })

module.exports = router
