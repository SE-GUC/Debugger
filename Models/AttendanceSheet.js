const uuid= require('uuid')

class AttendanceSheet
{
    // attended attribute indicates whether a member has attended.
    // meeting attribute indicates whether the attendace was for a meeting.
    // workshop attribute indicates whether the attendace was for a workshop.
    constructor(email, day, date, attended, meeting, workshop)
    {
        this.email = email;
        this.day = day;
        this.date = date;
        this.attended = attended;
        this.meeting = meeting;
        this.workshop = workshop;
        this.id = uuid.v4();
    }
    
    }
    
module.exports= AttendanceSheet;
