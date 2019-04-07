const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name : Joi.string().min(3).max(500).required(),
            PhoneNumber: Joi.string().min(3).max(100).required(),
            email: Joi.string().min(50).max(3000).required(),
            birthDay: Joi.date(),
            studyYear : Joi.string().min(3).max(500).required(),
            modeOfTran: Joi.string().min(50).max(3000).required(),
            generalAddress : Joi.string().min(3).max(500).required(),
            clubName: Joi.string().min(50).max(3000).required(),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name : Joi.string().min(3).max(500),
            PhoneNumber: Joi.string().min(3).max(100),
            email: Joi.string().min(50).max(3000),
            birthDay: Joi.date(),
            studyYear : Joi.string().min(3).max(500),
            modeOfTran: Joi.string().min(50).max(3000),
            generalAddress : Joi.string().min(3).max(500),
            clubName: Joi.string().min(50).max(3000),
        }

        return Joi.validate(request, updateSchema)
    }, 
}