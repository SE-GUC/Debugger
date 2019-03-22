const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {

            name: Joi.string().min(3).max(100).required()
        ,   createdBy: Joi.string().email().required()
        ,   members: Joi.array().items(Joi.string().email()).required()

        }



        return Joi.validate(request, createSchema)

    }
}