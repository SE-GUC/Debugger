const uuid= require('uuid')


class User 
{
    constructor(name, phoneNumber, email, password, birthday, studyYear, modeOfTran, 
                generalAddress, clubName)
                {
                    this.id= uuid.v4();
                    this.name = name;
                    this.phoneNumber = phoneNumber;
                    this.email = email;
                    this.password = password;
                    this.birthday = birthday;
                    this.studyYear = studyYear;
                    this.modeOfTran = modeOfTran;
                    this.generalAddress = generalAddress;
                    this.clubName = clubName;
                };
};

module.exports = User