const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {

            name: Joi.string().min(3).required(), 
            PhoneNumber: Joi.number().min(3), 
            email: Joi.string().min(50).required(),
            password: Joi.string().min(50).required(),
            birthDay: Joi.date().required(),
            studyYear: Joi.number(),
            modeOfTran: Joi.number(),
            generalAddress: Joi.string(),
            clubName: Joi.array()

        }
        return Joi.validate(request, createSchema)
    }
}