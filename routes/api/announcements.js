const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const announce = require("../../Models/Announcement");
const validator = require('../../validations/announcementsValidations')

router.get('/', async (req,res) => {
    const announcem = await announce.find()
    res.json({data: announcem})
})
module.exports = router ;