const express = require('express')
const router = express.Router()
//const mongoose = require('mongoose')

const Group = require('../../models/Group')
const validator = require('../../validations/groupValidations')


// The method creates a group with members or without members
router.post('/', async (req, res) => {

   try {

      const validation = validator.createValidation(req.body)
      if (validation.error)
         return res.status(400).send({ error: validation.error.details[0].message })

      const groupName = req.body.name
      const uniqueName = await Group.findOne({ name: groupName })
      if (uniqueName)
         return res.status(400).json({ error: 'Name already exists' })

      await Group.create(req.body)
      const groups = await Group.find()
      res.json({ msg: 'Group is created successfully', data: groups })


   }

   catch (error) {
      res.status(404).send(error.message)
   }


})

// Adding members to already existing groups
router.put('/', async (req, res) => {

   try {
      const validation = validator.updateValidation(req.body)
      if (validation.error)
         return res.status(400).send({ error: validation.error.details[0].message })

      const name = req.body.name
      const searchGroup = await Group.findOne({ name: name })
      if (searchGroup == false || !searchGroup)
         return res.status(404).send({ error: 'Group does not exist' })

      oldMembers = searchGroup.members
      console.log(searchGroup)
      const members = req.body.members
      const newMembers = oldMembers.concat(members)
      const updateName = { name: { $eq: name } }
      const addMembers = { $set: { members: newMembers } }

      const updated = await Group.updateOne(updateName, addMembers, (err, result) => {
         if (err)
            res.status(404).send(err.message)

      })

      const newGroup = await Group.findOne({ name: name })
      res.json({ msg: 'Members added successfully', data: newGroup })

   }

   catch (error) {
      res.status(404).send(error.message)
   }

})

module.exports = router
