const uuid= require('uuid')


class Message 
{
    constructor( name, email, message)
    {
        this.id = uuid.v4();
        this.name =  name;
        this.email = email;
        this.message = message;
    };
};

module.exports = Message