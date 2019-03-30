const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            interviewerEmail: Joi.string().min(3).max(500).required(),
            intervieweeEmail: Joi.string().min(3).max(100).required(),
            day: Joi.string().min(3).max(100).required(),
            date: Joi.string().min(3).max(100).required(),
            interviewslot: Joi.string().min(3).max(100).required(),
            startTime: Joi.string().min(50).max(3000).required(),
            endTime: Joi.string().min(50).max(3000).required(),
            interview: Joi.boolean().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            interviewerEmail: Joi.string().min(3).max(500).required(),
            intervieweeEmail: Joi.string().min(3).max(100).required(),
            day: Joi.string().min(3).max(100).required(),
            date: Joi.string().min(3).max(100).required(),
            interviewslot: Joi.string().min(3).max(100).required(),
            startTime: Joi.string().min(50).max(3000).required(),
            endTime: Joi.string().min(50).max(3000).required(),
            interview: Joi.boolean().required(),
        }

        return Joi.validate(request, updateSchema)
    },
}