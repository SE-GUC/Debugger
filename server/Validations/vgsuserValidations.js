const Joi = require('joi')

module.exports = {
    // updateValidation: request => {
    //     const updateSchema = {
    //         email: Joi.string().min(3).max(500).required(),
    //         userType:Joi.number(),
    //         clubCommittee:Joi.string().min(3).max(500),
    //         hobbies:Joi.string().min(3).max(500),
    //         VGSYear:Joi.string().min(3).max(500),
    //         appliedPosition: Joi.string().min(3).max(500),
    //         appStatus: Joi.number(),
    //         notes: Joi.string().min(3).max(500),
    //         gameName: Joi.string().min(3).max(500),
    //         gameScrSho: Joi.string().min(3).max(500),
    //         downloadLink:Joi.string().min(3).max(500),
    //         boothMember:Joi.boolean()
            
           
    //     }

    //     return Joi.validate(request, updateSchema)
    // },

    createValidation: request => {
        const createSchema = {
            userId:Joi.string(),
            userType: Joi.number(),
            clubCommittee: Joi.string().min(3).max(500).optional(),
            hobbies: Joi.string().min(3).max(500).optional(),
            VGSYear:Joi.number().optional(),
            appliedPosition:Joi.string().optional(),
            appStatus:Joi.number(),
            notes:Joi.string().optional(),
            gameName:Joi.string().optional(),
            gameScrSho: Joi.string().min(3).max(500),
            downloadLink:Joi.string().min(3).max(500).optional(),
            boothMember:Joi.boolean()
        }

        return Joi.validate(request, createSchema)
    }, 
}


