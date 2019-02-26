const uuid= require('uuid')

// All the Heads free slots will be saved here.
class HeadInterviewSheet 
{   constructor(email, date, slot )
    {
        this.email= email;
        this.date = date;
        this.slot = slot;
        
        this.id= uuid.v4;
    };

    
};

module.exports= HeadInterviewSheet;