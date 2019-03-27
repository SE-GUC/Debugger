//const uuid= require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnnouncementSchema= new Schema({
    clubName: {
        type: string,
        required: true
 } ,
   sentTo: {
       type: [string],
},
   sentFrom:{
       type: string,
       required: true
   },
   image:{
       type: Image,
},
  text:{
      type: string,
      required:true
  },
  pdfFile:{
      type: [File],
},
 eventId:{
     type: number,
     required: true
 },
  
})

module.exports= Announcement= mongoose.model('announcements', AnnouncementSchema );