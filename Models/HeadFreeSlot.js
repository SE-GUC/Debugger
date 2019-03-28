const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// All the Heads free slots will be saved here.
const HeadFreeSlotSchema = new Schema({

    headEmail: {
        type: String
        , required: true
    }

    ,

    day: {
        type: String
        , required: true
    }

    ,

    date: {
        type: String
        , required: true
    }

    ,

    slot: {
        type: String
        , required: true
    }

})

module.exports = HeadFreeSlot = mongoose.model('headFreeSlots', HeadFreeSlotSchema)