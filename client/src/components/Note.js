import React, { Component } from 'react'
import axios from 'axios';


export class Note extends Component {
    constructor(props){
        super(props);
        this.state= {
            email:"",
            note:""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleNote = this.handleNote.bind(this);
    }

    handleEmail = (event) =>{
        event.persist();
        this.setState({email: event.target.value},()=>(console.log(this.state)))
    }

    handleNote = (event) =>{
        event.persist();
        this.setState({note: event.target.value},()=>(console.log(this.state)))
    }

    handleAddNote= async () =>{
        let methodBody = {email: this.state.email, notes: this.state.note}
        const addNote = await axios.put("http://localhost:8000/api/VGS/note",methodBody)
        console.log(addNote.data.notes)
        if(addNote.status === 200){
            alert("Note have been successfully added")
        }
    }
  render() {
    return (
      <div>
        <span>Email</span>
        <input type='text' name='email' onChange={this.handleEmail}/>
        <br/>
        <span>Note</span>
        <input type='text' name='note' onChange={this.handleNote}/>
        <br/>
        <button onClick={this.handleAddNote}>Add Note</button>
      </div>
    )
  }
}

export default Note
