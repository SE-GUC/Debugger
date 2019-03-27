const Joi = require('joi')



module.exports = {

    createValidation: request => {

        const createSchema = {

            sender_email: Joi.string().min(3).max(500).required(),

            reciever_email: Joi.string().min(3).max(100).required(),

            Status: Joi.boolean() ,

            request_msg: Joi.string()

        }



        return Joi.validate(request, createSchema)

    },
}
