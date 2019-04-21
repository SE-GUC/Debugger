import React, { Component } from "react";
import axios from "axios";

export class ContactUs extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            clubName: '',
            name: '',
            email: '',
            message: ''
        }
    }

    onTodoChange(value){
        this.setState({
            clubName: value
        });
    }
    onTodoChange1(value){
        this.setState({
            name: value
        });
    }
    onTodoChange2(value){
        this.setState({
            email: value
        });
    }
    onTodoChange3(value){
      this.setState({
        message: value
      });
  }

    onSubmit = (e) => {
        e.preventDefault();
        this.addMessage(this.state.clubName, this.state.name, this.state.email, this.state.message);
        this.setState({  clubName: '',  name: '', email : '', message : ''});
      }

      addMessage = async(clubName, name, email, message) => {
        let messageCreated = {
            clubName,
            name,
            email,
            message
        }
        console.log(messageCreated);
        
        await axios.post("http://localhost:8000/api/awgs", messageCreated).then(() => {
          window.location.reload();
        })
    }

    render() {
        return (
            <div className="container">
            <p>You can contact us by filling down this form</p>
                <div className="input-group mb-3">
                <input className="form-control" name="clubName" onChange={e => this.onTodoChange(e.target.value)} value={this.state.clubName} placeholder="Club Name"/>
                </div>
                <div className="input-group mb-3">
                <input className="form-control" name="name" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.name} placeholder="Your name"/>
                </div>
                <div className="input-group mb-3">
                <input className="form-control" name="email" onChange={e => this.onTodoChange2(e.target.value)} value={this.state.email} placeholder="Your Email"/>
                </div>
                <div className="input-group mb-3">
                <textarea className="form-control" name="message" onChange={e => this.onTodoChange3(e.target.value)} value={this.state.message} placeholder="Your message"/>
                </div>
                <button onClick={this.onSubmit} className="btn btn-primary">Contact Us</button>
            </div>
        )
    }
}

export default ContactUs;