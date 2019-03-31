const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const user = require ("../../Models/User")
const validator = require('../../validations/userValidations')



router.put('/update', async (req,res) => {
    try {
     const email = req.params.email
     const x = await user.findOne({email})
     if(!x) return res.status(404).send({error: 'User does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedUser = await user.updateOne(req.body)
     res.json({msg: 'User updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })




module.exports = router;