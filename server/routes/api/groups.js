const express = require('express')
const router = express.Router()
//const mongoose = require('mongoose')

const Group = require('../../Models/Group')
const User = require('../../Models/User')
const validator = require('../../Validations/groupValidations')


router.get('/:email', async (req, res) => {

   try{
      const group = await Group.find({createdBy: req.params.email})
      res.send (group)
   }

   catch (error){
     return res.send(error.message)
   }
})

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
      
      for ( i = 0; i < req.body.members.length;  i++){
          const member = await User.findOne ({email: req.body.members[i]})
          if (!member || member == false)
             return res.status(400).json({ error: 'One of the Members is not a user' })

      }

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
      
      for ( i = 0; i < req.body.members.length;  i++){
        const member = await User.findOne ({email: req.body.members[i]})
        if (!member || member == false)
          return res.status(400).json({ error: 'One of the Members is not a user' })
        }

      oldMembers = searchGroup.members
      const members = req.body.members
      const newMembers = oldMembers.concat(members)
      const updateName = { name: { $eq: name } }
      const addMembers = { $set: { members: newMembers } }

      const updated = await Group.updateOne(updateName, addMembers, (err, result) => {
         if (err)
            return res.status(404).send(err.message)

      })

      const newGroup = await Group.find({ createdBy: searchGroup.createdBy })
      res.json({ msg: 'Members added successfully', data: newGroup })

   }

   catch (error) {
      res.status(404).send(error.message)
   }

})

module.exports = router
