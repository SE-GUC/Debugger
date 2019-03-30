// const uuid= require('uuid')

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// class User 
// {
//     constructor(name, phoneNumber, email, password, birthday, studyYear, modeOfTran, 
//                 generalAddress, clubName)
//                 {
//                     this.id= uuid.v4();
//                     this.name = name;
//                     this.phoneNumber = phoneNumber;
//                     this.email = email;
//                     this.password = password;
//                     this.birthday = birthday;
//                     this.studyYear = studyYear;
//                     this.modeOfTran = modeOfTran;
//                     this.generalAddress = generalAddress;
//                     this.clubName = clubName;
//                 };
// };

// module.exports = User

const UserSchema = new Schema({
    
    name : {
        type: String,
        required: true
    },
    PhoneNumber : {
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    birthDay : {
        type: Date,
        required: true
    },
    studyYear : {
        type: String,
        required: true
    },
    modeOfTran : {
        type: Number,
        required: true
    },
    generalAddress : {
        type: String,
        required: true
    },
    clubName : {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', UserSchema, "User")