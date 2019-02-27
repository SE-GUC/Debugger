const uuid= require('uuid')


class VGS_User
{   constructor(email, userType, clubCommittee, hobbies, VGSYear, appliedPosition, appStatus, 
                notes, gameName, gameScrSho, downloadLink, boothMember)
    {
        this.email= email;
        this.userType = userType;
        this.clubCommittee = clubCommittee;
        this.hobbies = hobbies;
        this.VGSYear = VGSYear;
        this.appliedPosition = appliedPosition;
        this.appStatus = appStatus;
        this.notes = notes;
        this.gameName = gameName;
        this.gameScrSho = gameScrSho;
        this.downloadLink = downloadLink;
        this.boothMember = boothMember;
    };

};

module.exports = VGS_User