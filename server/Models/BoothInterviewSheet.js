const uuid= require('uuid')

class BoothInterviewSheet {

// The interview attribute indicates whether there is interview in that specific slot
// Its value can be 'true'/ 'false'

// When a Head adds a free slot in his sheet , his email, name, date and interviewSlot 
// will be automatically added to this table and the startTime and endTime
// attributes will be set to null, interview attribute will be set to false and freeSlot will 
// be set to True
// Then, if a booth member wants to add an interview, he can set the value of these attributes.
// If he wants to chnage the interviewer, he can simply set these attributes 
// to null (false for interview) and add the interview to another interviewer.
// Once a Head deletes his free slot, the row indicating that in the HeadInterviewSheet will be deleted
// and the attribute "freeSlot" will be set to False so that the booth member can change asign
// the interview to another inteviewer.

    constructor (interviewerEmail, intervieweeEmail, date, interviewslot, freeSlot, startTime, 
    endTime, interview )
    {
        this.interviewerEmail = interviewerEmail;
        this.intervieweeEmail = intervieweeEmail;
        this.date = date;
        this.interviewslot = interviewslot;
        this.freeSlot = freeSlot;
        this.startTime = startTime;
        this.endTime = endTime;
        this.interview = interview;
        
        this.id= uuid.v4;
    };

    
};

module.exports = BoothInterviewSheet