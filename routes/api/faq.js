const express = require('express')
const router = express.Router()
const app = express()
const FAQ = [{
    question:'why',
    askedBy:'Ahmed',
    answer:'blah blah blah',
    answeredBy:'Passant',
    date:'12.2.2019',
    noOfTimes:'6'
},
{
    question:'why',
    askedBy:'Ahmed',
    answer:'blah blah blah',
    answeredBy:'Passant',
    date:'12.2.2019',
    noOfTimes:'6'
}
]

module.exports = {router,FAQ} 