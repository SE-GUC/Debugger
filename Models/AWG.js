// const uuid= require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// class AWG 
// {
//     constructor( clubDescription, clubName, aboutUs, contactUs )
//     {
//         this.id = uuid.v4();
//         this.clubDescription = clubDescription;
//         this.clubName = clubName;
//         this.aboutUs = aboutUs;
//         this.contactUs = contactUs
//     };
// };

// Create the schema
const AWGSchema = new Schema({
    clubDescription : {
        type: String,
        required: true
    },
    clubName : {
        type: String,
        required: true
    },
    aboutUs : {
        type: String,
        required: true
    },
    contactUs : {
        type: String, 
        required: true
    }
})

module.exports = AWG = mongoose.model('AWGs', AWGSchema)

// module.exports = AWG
