const uuid= require('uuid')

class FAQs 
{
    // askedBy attribute will contain the email of the person who asked the question.
    // answeredBy attribute will contain the email of the person who answered the question.

    // rank attribute?
    constructor( question, askedBy, answer, answeredBy, date, noOfTimes)
    {
        this.id = uuid.v4();
        this.question = question;
        this.askedBy = askedBy;
        this.answer = answer;
        this.askedBy = answeredBy;
        this.date = date;
        this.noOfTimes = noOfTimes;


    };
};

module.exports = FAQs