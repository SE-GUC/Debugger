const express = require('express');
const router = express.Router();
const attendanceSheet = require ('../../models/AttendanceSheet');


const attendance=[ new attendanceSheet('omar@gmail.com','Thursday','12-12-2018', true, false, true),
new attendanceSheet('omar@gmail.com','Sunday','11-12-2018', true, false, true),
new attendanceSheet('mohamed@gmail.com','Thursday','12-12-2018', false, false, true)]

router.get('/',(req,res) => {
    res.send(attendance);
});

router.get('/userattendance', (req, res) => {
    const userEmail= req.body.email;
    const attendancee = attendance.filter(attendance => attendance.email===userEmail);
    res.send(attendance);
    

});




module.exports= router;