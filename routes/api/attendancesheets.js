const express = require('express')
const router = express.Router()
import AttendanceSheetSchema from AttendanceSheet;
const AttendanceSheet = require('../../Models/AttendanceSheet')
const validator = require('../../validations/attendancessheetsValidations');
const attendacesheets = [
        new AttendanceSheet('seif','Sunday', '11/12/2018', true, true,false),
        new AttendanceSheet('ahmed', 'monday', '14/12/2018', true, false, true),
        new AttendanceSheet( 'seif','Sunday', '11/12/2018', false, false,true),
        new AttendanceSheet('omar','thursday', '16/12/2018', true, false,true),
        new AttendanceSheet( 'medhat','Sunday', '12/12/2018', true, false,true),
        new AttendanceSheet( 'medhat','thursday', '16/12/2018', false, false,true),
        new AttendanceSheet( 'ghada','wednesday', '15/12/2018', true, false,true),
        new AttendanceSheet( 'ghada','saturaday', '18/12/2018', false, false,true),
    ];

    
    router.get('/', async (req,res) => {
        const attendacesheets = await AttendanceSheet.find()
        res.json({data: attendacesheets})
    })

router.put('/editAtt', (req, res) => {
        const memberEmail = req.body.email; 
        const AttendanceSheet = attendacesheets.filter(AttendanceSheet => AttendanceSheet.email=== memberEmail);
        res.send(AttendanceSheet);});
       
module.exports(router);
