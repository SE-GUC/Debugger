const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Groups have unique names?
const GroupSchema = new Schema({
    //id: {  type: String
    // ,  default: uuid.v4
    // }
    //,
    name: {
        type: String
        , required: true
    }
    ,
    createdBy: {
        type: String
        , required: true
    }
    ,
    members: {
        type: [String]
        // removed required: true
    }


})

module.exports = Group = mongoose.model('groups', GroupSchema)
