const uuid= require('uuid')

class Nebny
{
    constructor( clubDescription, clubName )
    {
        this.id = uuid.v4();
        this.clubDescription = clubDescription;
        this.clubName = clubName;
    };
};

module.exports = Nebny