//const uuid= require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSheet= new Schema({
    email: {
        type: string,
        required: true
 } ,
   day: {
       type: day,
},
  date:{
       type: date,
       required: true
   },
   attended:{
       type: boolean,
       required:true
},
meeting:{
      type: boolean,
      required:true
  },
  workshop:{
      type: string,
  }
})

module.exports= Announcement= mongoose.model('attendancesheets', AttendanceSheetSchema );

//class AttendanceSheet

    // attended attribute indicates whether a member has attended.
    // meeting attribute indicates whether the attendace was for a meeting.
    // workshop attribute indicates whether the attendace was for a workshop.
  //  constructor(email, day, date, attended, meeting, workshop)
    //{
      //  this.email = email;
        //this.day = day;
        //this.date = date;
        //this.attended = attended;
        //this.meeting = meeting;
        //this.workshop = workshop;
        //this.id = uuid.v4();
    //}
    
    //}