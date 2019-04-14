const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name : Joi.string().min(3).max(500).required(),
            PhoneNumber: Joi.number().required(),
            email: Joi.string().min(50).max(3000).required(),
            password: Joi.string().min(50).max(3000).required(),
            birthDay: Joi.date(),
            studyYear : Joi.number().required(),
            modeOfTran: Joi.number().required(),
            generalAddress : Joi.string().min(3).max(500).required(),
            clubName: Joi.array().required(),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name : Joi.string().min(3).max(500).required(),
            PhoneNumber: Joi.number().required(),
            email: Joi.string().min(50).max(3000).required(),
            password: Joi.string().min(50).max(3000).required(),
            birthDay: Joi.date(),
            studyYear : Joi.number().required(),
            modeOfTran: Joi.number().required(),
            generalAddress : Joi.string().min(3).max(500).required(),
            clubName: Joi.array().required(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}