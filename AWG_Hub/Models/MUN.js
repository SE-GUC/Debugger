const uuid= require('uuid')

class  MUN
{
    constructor( clubDescription, clubName )
    {
        this.id = uuid.v4();
        this.clubDescription = clubDescription;
        this.clubName = clubName;
    };
};

module.exports = MUN