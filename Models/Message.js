// const uuid= require('uuid')

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// class Message 
// {
//     constructor( clubName, name, email, message)
//     {
//         this.id = uuid.v4();
//         this.clubName = clubName;
//         this.name =  name;
//         this.email = email;
//         this.message = message;
//     };
// };
// Create the schema
const MessageSchema = new Schema({
    clubName : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    message : {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Messages', MessageSchema)


// module.exports = Message


/*
class Message 
{
    constructor( name, email, message)
    {
        this.name =  name;
        this.email = email;
        this.message = message;
    };
};

module.exports = Message
*/
