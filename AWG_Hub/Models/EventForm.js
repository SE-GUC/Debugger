const uuid= require('uuid')


class EventForm 
{
    constructor(eventId, studentId, attendeeName, phoneNumber, email, IdCardNumber)
    {
        this.id = uuid.v4();
        this.eventId = eventId;
        this.studentId = studentId;
        this.attendeeName = attendeeName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.IdCardNumber = IdCardNumber;
    };

};