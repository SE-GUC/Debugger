const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(500).required(),
            phoneNumber: Joi.number().min(50).max(3000).required(),
            email: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(3).max(100).required(),
            birthday: Joi.string().min(3).max(100).required(),
            studyYear: Joi.number().min(50).max(3000).required(),
            modeOfTran: Joi.string().min(3).max(100).required(),
            generalAddress: Joi.string().min(3).max(100).required(),
            clubName: Joi.string().min(3).max(100).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(500).required(),
            phoneNumber: Joi.number().min(50).max(3000).required(),
            email: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(3).max(100).required(),
            birthday: Joi.string().min(3).max(100).required(),
            studyYear: Joi.number().min(50).max(3000).required(),
            modeOfTran: Joi.string().min(3).max(100).required(),
            generalAddress: Joi.string().min(3).max(100).required(),
            clubName: Joi.string().min(3).max(100).required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}