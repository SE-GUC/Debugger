const uuid= require('uuid')

// All the Heads free slots will be saved here.
class HeadFreeSlot 
{   constructor(headEmail, day, date, slot )
    {
        this.headEmail= headEmail;
        this.day = day;
        this.date = date;
        this.slot = slot;
        
        this.id= uuid.v4;
    };

    
};

module.exports= HeadFreeSlot;