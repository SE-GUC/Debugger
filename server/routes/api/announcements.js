const express = require("express");
const router = express.Router();

const announce = require("../../Models/Announcement");

const annoucem = [
    new announce ("VGS" , "me" , "you" , null , "event" , null , "17" )
];

router.get('/', (req, res) => res.json({data: annoucem}));

module.exports = router ;