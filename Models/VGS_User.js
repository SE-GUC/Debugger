const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VgsUserSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        userType: {
            type: String,
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
            type: String,
            default: 'pending'
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