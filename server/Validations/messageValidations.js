const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            clubName:Joi.string(),
            name:Joi.string(),
            email:Joi.string(),
            message:Joi.string().optional(),
        }

        return Joi.validate(request, createSchema)
    },
}