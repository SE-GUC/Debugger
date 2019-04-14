const uuid= require('uuid')


class RecruitmentRequirement
{
    constructor(requirement, requiredBy)
    {
        this.id = uuid.v4();
        this.requirement = requirement;
        this.requiredBy = requiredBy;
       
    };

};

module.exports = RecruitmentRequirement;