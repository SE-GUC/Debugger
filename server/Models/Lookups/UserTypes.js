const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserTypeSchema = new Schema({

    UserType: {
        type: String,
        unique: true
    },
    UserTypeCode: {
        type: Number,
        unique: true
    }
})
module.exports = mongoose.model('UserTypes', UserTypeSchema, "UserTypes")