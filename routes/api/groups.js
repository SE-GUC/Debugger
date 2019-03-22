const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Group = require('../../models/Group')
const validator = require('../../validations/groupValidations')

// The method creates a group with members
router.post('/', async (req, res) => {

   // try {

        const validation = validator.createValidation(req.body)
        if (validation.error) return res.status(400).send({ error: validation.error.details[0].message })

        const group = await Group.create(req.body)
        res.json({ msg: 'Your group was created successfully', data: group })

   // }

   // catch (error) {
       // console.log(error)

   // }

})

module.exports = router

 // Adding members to already existing groups
/*router.put('/id', async (req,res) => {

   try {
    const validation = validator.createValidation(req.body)
    if (validation.error) return res.status(400).send({ error: validation.error.details[0].message })

    const searchGroup = await Group.findById(req.params.id)
    if(!searchGroup) return res.status(404).send({error: 'Group does not exist'})
    const updatedGroup = await Group.updateOne(req.body)
    res.json({msg: 'Members added successfully'})

   }

   catch(error) {
       console.log(error)

   }

})*/