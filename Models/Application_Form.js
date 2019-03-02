const uuid= require('uuid')


class Application_Form
{
    constructor(requirement, requiredBy)
    {
        this.id = uuid.v4();
        this.requirement = requirement;
        this.requiredBy = requiredBy;
       
    };

};

module.exports = Application_Form;