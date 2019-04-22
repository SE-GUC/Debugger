const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {

            name: Joi.string().min(1).required(), 
            PhoneNumber: Joi.number().required(), 
            email: Joi.string().min(3).required(),
            password: Joi.string().min(6).required(),
            birthDay: Joi.date().required(),
            studyYear: Joi.number().required(),
            modeOfTran: Joi.number().required(),
            generalAddress: Joi.string().required(),
            clubName: Joi.array()

        }
        return Joi.validate(request, createSchema)
    }
}