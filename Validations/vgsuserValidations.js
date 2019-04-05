const Joi = require('joi')

module.exports = {
    updateValidation: request => {
        const updateSchema = {
            email: Joi.string().min(3).max(500).required(),
            userType:Joi.string().min(3).max(500),
            clubCommittee:Joi.string().min(3).max(500),
            hobbies:Joi.string().min(3).max(500),
            VGSYear:Joi.string().min(3).max(500),
            appliedPosition: Joi.string().min(3).max(500),
            appStatus: Joi.string().min(3).max(500),
            notes: Joi.string().min(3).max(500),
            gameName: Joi.string().min(3).max(500),
            gameScrSho: Joi.string().min(3).max(500),
            downloadLink:Joi.string().min(3).max(500),
            boothMember:Joi.boolean()
            
           
        }

        return Joi.validate(request, updateSchema)
    },

    createValidation: request => {
        const createSchema = {
            email: Joi.string().min(3).max(500).required(),
            userType: Joi.string().min(3).max(100).optional(),
            clubCommittee: Joi.string().min(3).max(500).optional(),
            hobbies: Joi.string().min(3).max(500).optional(),
            VGSYear:Joi.number().min(50).max(3000).optional(),
            appliedPosition:Joi.string().min(3).max(500).optional(),
            appStatus:Joi.string().min(3).max(500).optional(),
            notes:Joi.string().optional(),
            gameName:Joi.string().min(3).max(500).optional(),
            gameScrSho: Joi.string().min(3).max(500),
            downloadLink:Joi.string().min(3).max(500).optional(),
            boothMember:Joi.boolean()
        }

        return Joi.validate(request, createSchema)
    }, 
}


