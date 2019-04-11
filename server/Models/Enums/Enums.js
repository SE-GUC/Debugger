var Enum = require('enum');



var appStatusEnum = new Enum({'Pending': 1, 'Accepted': 2, 'Rejected': 3});
var transportationEnum = new Enum({'Car': 1, 'Bus': 2});
var clubsEnum = new Enum({'Nebny': 4, 'VGS': 1, 'MUN': 2,"TIQ":3});
var studyYearEnum = new Enum({'1st Year': 1, '2nd Year': 2,'3rd Year': 3,'4th Year': 4,'5th Year': 5});
var userTypeEnum = new Enum({'President': 1, 'Director': 2,'Head': 3,'Member': 4,'Applicant': 5});

module.exports.Enum_appStatus=appStatusEnum;
module.exports.Enum_transportation=transportationEnum;
module.exports.Enum_clubs=clubsEnum;
module.exports.Enum_studyYear=studyYearEnum;
module.exports.Enum_userType=userTypeEnum;