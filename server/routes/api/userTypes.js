const express = require('express')
const router = express.Router()

const UserTypes = require('../../Models/UserTypes')

router
    .route('/createUserTypes')
    .post(async (req, res)=>{
        try{
            const userType = await UserTypes.create(req.body)
            return res.send(userType)
        }
        catch(error){
            return res.status(400).json({ error: `Error, couldn't create the user types`})
        }
    })

router
    .route('/Usertypes')
    .get(async (req, res)=>{
        try{
            const userTypes = await UserTypes.find()
            return res.send(userTypes)
        }
        catch(error){
            return res.status(404).json({ error: `Error, couldn't get the user types`})
        }
    })

router
    .route('/certainUserType/:userTypeCode')
    .get(async (req, res)=>{
        try{
            const uT = await UserTypes.find({"UserTypeCode": req.params.userTypeCode} )
            return res.send(uT)
        }
        catch(error){
            return res.status(404).json({ error: `Error, couldn't get the user type`})
        }
    })
module.exports = router