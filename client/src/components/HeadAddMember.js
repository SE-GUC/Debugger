import React, { Component } from 'react'
import axios from 'axios';

export class HeadAddMember extends Component {
    constructor(props){
        super(props);
        this.state= {
            email:"",
            clubCommittee:""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleClubCommittee = this.handleClubCommittee.bind(this);
    }

    handleEmail = (event) =>{
        event.persist();
        this.setState({email: event.target.value},()=>(console.log(this.state)))
    }

    handleClubCommittee = (event) =>{
        event.persist();
        this.setState({clubCommittee: event.target.value},()=>(console.log(this.state)))
    }

    handleAddMember= async () =>{
        let methodBody = {email: this.state.email, clubCommittee: this.state.clubCommittee}
        const addNote = await axios.put("http://localhost:8000/api/VGS/addmemberincommity",methodBody)
        console.log(addNote.data)
        if(addNote.status === 200){
            alert("Member have been successfully added in this committee")
        }
    }
  render() {
    return (
      <div>
        <span>Email</span>
        <input type='text' name='email' onChange={this.handleEmail}/>
        <br/>
        <span>Committee</span>
        <input type='text' name='clubCommittee' onChange={this.handleClubCommittee}/>
        <br/>
        <button onClick={this.handleAddMember}>Add Member</button>
      </div>
    )
  }
}

export default HeadAddMember
