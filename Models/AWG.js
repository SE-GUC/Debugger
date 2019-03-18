const uuid= require('uuid')

class AWG 
{
    constructor( clubDescription, clubName, aboutUs, contactUs )
    {
        this.id = uuid.v4();
        this.clubDescription = clubDescription;
        this.clubName = clubName;
        this.aboutUs = aboutUs;
        this.contactUs = contactUs
    };
};

module.exports = AWG
