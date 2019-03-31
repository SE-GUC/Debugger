const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            clubName: Joi.string().min(3).max(500).required(),
            sentTo: Joi.string().min(3).max(100).required(),
            sentFrom: Joi.string().min(3).max(100).required(),
            image: Joi.image().min(3).max(100).required(),
            text: Joi.string().min(3).max(100).required(),
            pdfFile: Joi.pdfFile().min(50).max(3000).required(),
            eventId: Joi.number().min(50).max(3000).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            clubName: Joi.string().min(3).max(500).required(),
            sentTo: Joi.string().min(3).max(100).required(),
            sentFrom: Joi.string().min(3).max(100).required(),
            image: Joi.image().min(3).max(100).required(),
            text: Joi.string().min(3).max(100).required(),
            pdfFile: Joi.pdfFile().min(50).max(3000).required(),
            eventId: Joi.number().min(50).max(3000).required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}