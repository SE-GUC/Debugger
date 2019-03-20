const uuid= require('uuid')

class Vote {

    constructor(issuerId, endTime, accept, reject){
        this.id = uuid.v4();
        this.issuerId = issuerId;
        this.VoteEndTime = endTime;
        this.accept = accept;
        this.reject =  reject;
    }
}

module.exports = Vote