const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AnnouncementSchema = new Schema({
    clubName:{
        type: String,
        required: true
    },
    sentTo:{
        type: String,
        required: true
    },
    sentFrom:{
        type: String,
        required : true
    },
    image:{
        type: image,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    pdfFile:{
        type: pdfFile,
        required: true
    },
    eventId:{
        type: String,
        required: true
    }
})
module.exports = Announcement = mongoose.model('announcements' , AnnouncementSchema)