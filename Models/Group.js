const uuid= require('uuid')

class Group {

    // Groups have unique names.
    // name can be repeated for different rows if it has the same createdBy attribute value (created
    // by the same person).

    constructor (name, createdBy, member) {
        this.name = name;
        this.createdBy = createdBy;
        this.member = member; 
        this.id = uuid.v4();
    }
} 

module.exports = Group