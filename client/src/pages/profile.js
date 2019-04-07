import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = { user: { _id: "5ca9d093066f5415585ef61f",name: " ", PhoneNumber: " ", email: " ", password: " ", birthDay: " ", studyYear: " ", modeOfTran: " ", generalAddress: " ", clubName: " "}}
        axios.get("http://localhost:8000/api/profile/"+this.state.user._id).then(res => this.setState({ user: res.data}))
    }

    render() {
        return (
            <div className="Profile">
                Username {this.state.user.name} <br/>
                Phone Number {this.state.user.PhoneNumber} <br/>
                Email {this.state.user.email} <br/>
                Birthday {this.state.user.birthDay} <br/>
                Study Year {this.state.user.studyYear} <br/>
                Mode Of Tran {this.state.user.modeOfTran} <br/>
                General Address {this.state.user.generalAddress} <br/>
                Club Name {this.state.user.clubName}
            </div>
        )
    }
}
export default Profile;