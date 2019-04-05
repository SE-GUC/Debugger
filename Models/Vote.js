const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VoteSchema = new Schema(
    {
        issuerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VGS_User',
            required: true
        },
        nomineeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VGS_User',
            required: true
        },
        voteEndTime: {
            type: Date,
            required: true
        },
        accept: {
            type: Number
        },
        reject: {
            type: Number
        },
        voters: {
            type: Array
        }
    }
)
module.exports = mongoose.model('Vote', VoteSchema, 'Vote')