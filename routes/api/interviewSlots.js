const express = require("express");
const router = express.Router();

const sheet = require ("../../Models/BoothInterviewSheet")


const interviews = [
    new sheet("email" , "email2", "mon" , "12-02-2019 " , "1st" , "14:00" , "15:00" , true )
]


router.put('/', (req, res) => {
    const userEmail = req.body.interviewerEmail;
    const slotDay = req.body.oldDay;
    const slotDate = req.body.oldDate;
    const intSlot = req.body.oldInterviewSlot;
    
    const interview_slot = interviews.find(interview_slot => interview_slot.interviewerEmail === userEmail
        && interview_slot.day === slotDay && interview_slot.date === slotDate && interview_slot.interviewslot === intSlot);
    
    const updatedStartTime = req.body.startTime;
    const updatedEndTime = req.body.endTime;
    const updatedDate = req.body.date ;
    const updatedinterviewSlot = req.body.interviewSlot;
        
        interview_slot.startTime = updatedStartTime;
        interview_slot.endTime = updatedEndTime;
        interview_slot.date = updatedDate;
        interview_slot.interviewSlot = updatedinterviewSlot;
    res.send(interviews);
})

module.exports = router; 
