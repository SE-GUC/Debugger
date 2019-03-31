const Joi = require('joi')



module.exports = {

    createValidation: request => {

        const createSchema = {

            sender_email: Joi.string().min(3).max(500).required(),

            reciever_email: Joi.string().min(3).max(100).required(),

            Status: Joi.boolean() ,

            request_msg: Joi.string().required()

        }



        return Joi.validate(request, createSchema)

 
    },

   /* updateValidation: request => {
        const updateSchema = {
            sender_email: Joi.string().min(3).max(500) ,

            reciever_email: Joi.string().min(3).max(100),

            Status: Joi.boolean() ,

            request_msg: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, */

}

