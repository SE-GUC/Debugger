const express = require('express')


const router = express.Router()



const Request = require('../../Models/Request')




const validator = require('../../Validations/RequestValidations')











router.post('/', async (req,res) => {

   try {

    const isValidated = validator.createValidation(req.body)

    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    const newRequest = await Request.create(req.body)

    res.json({msg:'Request was created successfully', data: newRequest})

   }

   catch(error) {

       

       console.log(error)

   }  

})

module.exports = router

    