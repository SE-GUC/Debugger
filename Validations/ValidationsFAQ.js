const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            question: Joi.string().min(3).max(500).required(),
            askedBy: Joi.string().min(3).max(100).required(),
            noOfTimes: Joi.number().min(50).max(3000).required(),
            answer: Joi.string(),
            answeredBy:Joi.string().min(3).max(100).required(),
            date:Joi.string().min(3).max(100).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            question: Joi.string().min(3).max(500).required(),
            askedBy: Joi.string().min(3).max(100).required(),
            noOfTimes: Joi.number().min(50).max(3000).required(),
            answer: Joi.string(),
            answeredBy:Joi.string().min(3).max(100).required(),
            date:Joi.string().min(3).max(100).required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}