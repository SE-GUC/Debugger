const uuid= require('uuid')

class VGS 
{
    constructor( clubDescription, clubName )
    {
        this.id = uuid.v4();
        this.clubDescription = clubDescription;
        this.clubName = clubName;
    };
};

module.exports = VGS