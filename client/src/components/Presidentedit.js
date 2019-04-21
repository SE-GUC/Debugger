import React, { Component } from 'react'
import axios from 'axios';


export class Presidentedit extends Component {
    constructor(props){
        super(props);
        this.state= {
            email:"",
            userType:"",
            clubCommittee:"",
            hobbies:"",
            VGSYear:"",
            appliedPosition:"",
            appStatus:"",
            note:"",
            gameName:"",
            gameScrSho:"",
            downloadLink:"",
            boothMember:""
           
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleuserType = this.handleuserType.bind(this);
        this.handleclub = this.handleclub.bind(this);
        this.handlehobby = this.handlehobby.bind(this);
        this.handlevgsyear = this.handlevgsyear.bind(this);
        this.handlePosition = this.handlePosition.bind(this);
        this.handlestatus = this.handlestatus.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handlegamename = this.handlegamename.bind(this);
        this.handlegameScrSho = this.handlegameScrSho.bind(this);
        this.handlelink = this.handlelink.bind(this);
        this.handleboothmember = this.handleboothmember.bind(this);
    }

    handleEmail = (event) =>{
        event.persist();
        this.setState({email: event.target.value},()=>(console.log(this.state)))
    }
    handleuserType=(event)=>{
        event.persist();
        this.setState({userType: event.target.value},()=>(console.log(this.state)))
    }
    handleclub=(event)=>{
        event.persist();
        this.setState({clubCommittee: event.target.value},()=>(console.log(this.state)))
    }
    handlehobby= (event) =>{
        event.persist();
        this.setState({hobbies: event.target.value},()=>(console.log(this.state)))
    }
    handlevgsyear= (event) =>{
        event.persist();
        this.setState({VGSYear: event.target.value},()=>(console.log(this.state)))
    }
    handlePosition= (event) =>{
        event.persist();
        this.setState({appliedPosition: event.target.value},()=>(console.log(this.state)))
    }
    handlestatus= (event) =>{
        event.persist();
        this.setState({appStatus: event.target.value},()=>(console.log(this.state)))
    }
    handleNote = (event) =>{
        event.persist();
        this.setState({note: event.target.value},()=>(console.log(this.state)))
    }
    handlegamename = (event) =>{
        event.persist();
        this.setState({gameName: event.target.value},()=>(console.log(this.state)))
    }
    handlegameScrSho= (event) =>{
        event.persist();
        this.setState({gameScrSho: event.target.value},()=>(console.log(this.state)))
    }
    handlelink= (event) =>{
        event.persist();
        this.setState({downloadLink: event.target.value},()=>(console.log(this.state)))
    }
    handleboothmember = (event) =>{
        event.persist();
        this.setState({boothMember: event.target.value},()=>(console.log(this.state)))
    }

    handleEdit= async () =>{
        let methodBody = {email: this.state.email, notes: this.state.note,
        clubCommittee:this.state.clubCommittee,userType:this.state.userType,hobbies:this.state.hobbies,
            VGSYear:this.state.VGSYear,
            appliedPosition:this.state.appliedPosition,
            appStatus:this.state.appStatus,
            gameName:this.state.gameName,
            gameScrSho:this.state.gameScrSho,
            downloadLink:this.state.downloadLink,
            boothMember:this.state.boothMember
           }
        const editmember = await axios.put("http://localhost:8000/api/VGS/edituser",methodBody)
        console.log(editmember.data.notes)
        if(editmember.status === 200){
            alert("DATA HAVE BEEN CHANGED ")
        }
    }
  render() {
    return (
      <div>
        <span>Email</span>
        <input type='text' name='email' onChange={this.handleEmail}/>
        <br/>
        <span>Use type</span>
        <input type='text' name='email' onChange={this.handleuserType}/>
        <br/>
        <span>club Committee</span>
        <input type='text' name='email' onChange={this.handleclub}/>
        <br/>
        <span>game Name</span>
        <input type='text' name='email' onChange={this.handlegamename}/>
        <br/>
        <span>applied Position</span>
        <input type='text' name='email' onChange={this.handlePosition}/>
        <br/>
        <span>booth Member(true or false)</span>
        <input type='text' name='email' onChange={this.boothMember}/>
        <br/>
        <span>app Status</span>
        <input type='text' name='email' onChange={this.handlestatus}/>
        <br/>
        <span>game ScrSho</span>
        <input type='text' name='email' onChange={this.handlegameScrSho}/>
        <br/>
        <span>hobbies</span>
        <input type='text' name='email' onChange={this.handlehobby}/>
        <br/>
        <span>downloadLink</span>
        <input type='text' name='email' onChange={this.handlelink}/>
        <br/>
        <span>VGS Year</span>
        <input type='text' name='email' onChange={this.handlevgsyear}/>
        <br/>
        <span>Note</span>
        <input type='text' name='note' onChange={this.handleNote}/>
        <br/>
        <button onClick={this.handleEdit}>Edit</button>
      </div>
    )
  }
}

export default Presidentedit
