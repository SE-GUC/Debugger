const uuid= require('uuid')


class Event 
{
    constructor( eventType, description, date)
    {
        this.id = uuid.v4();
        this.eventType =  eventType;
        this.description = description;
        this.date = date;
    };
};