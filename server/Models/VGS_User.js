const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VgsUserSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userType: {
            type: Number,
        },
        clubCommittee: {
            type: String,
        },
        hobbies: {
            type: String
        },
        VGSYear: {
            type: Number
        },
        appliedPosition: {
            type: String
        },
        appStatus: {
            type: Number,
            default: 1
        },
        notes: {
            type: String
        },
        gameName: {
            type: String
        },
        gameScrSho: {
            type: String
        },
        downloadLink: {
            type: String
        },
        boothMember: {
            type: Boolean
        }
    }
)
module.exports = mongoose.model('VGS_User', VgsUserSchema,"VGS_User")