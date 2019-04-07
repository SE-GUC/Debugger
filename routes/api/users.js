const express = require('express')
const router=express.Router()
const User = require('../../Models/User')

router.get('/:id', async (req, res) => {
   const getUser = await User.findById(req.params.id)
   res.send(getUser)
})

router.post('/', async (req, res) => {
   const newUser = new User({
      name: req.body.name,
      PhoneNumber: req.body.phoneNumber,
      email:req.body.email,
      birthDay: req.body.birthday,
      studyYear: req.body.studyYear,
      modeOfTran: req.body.modeOfTran,
      generalAddress: req.body.generalAddress,
      clubName: req.body.clubName
   })
   // const username = await user.findOne({ name: newUser.name })
   // if (username)
   //    return res.status(400).json({ error: 'Name already exists' })
   await newUser.save()
   res.send(newUser)
})
module.exports = router