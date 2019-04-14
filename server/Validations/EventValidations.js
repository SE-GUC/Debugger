const Joi = require('joi')



module.exports = {

    createValidation: request => {

        const createSchema = {

            eventName: Joi.string().min(3).max(500).required(),

            eventType: Joi.string().min(3).max(100),

            description : Joi.string().required() ,

            date: Joi.string()
        }



        return Joi.validate(request, createSchema)

 
    } }