import React, { Component } from 'react'
import axios from 'axios';


export class AddRequest extends Component {
    constructor(props){
        super(props);
        this.state= {
          sender_email:"",
          reciever_email:"" ,
          Status : false ,
          request_msg : "" ,
          showMsg:false,
          showStatus : ""
        };
        this.handleSEmail = this.handleSEmail.bind(this);
        this.handleREmail = this.handleREmail.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleMSG = this.handleMSG.bind(this);
    }

    handleSEmail = (event) =>{
        event.persist();
        this.setState({sender_email: event.target.value},()=>(console.log(this.state)))
    }

    handleREmail = (event) =>{
      event.persist();
      this.setState({reciever_email: event.target.value},()=>(console.log(this.state)))
  }
  handleStatus = (event) =>{
    event.persist();
    this.setState({Status: event.target.value},()=>(console.log(this.state)))
}
handleMSG = (event) =>{
  event.persist();
  this.setState({request_msg: event.target.value},()=>(console.log(this.state)))
}
    

    handleAddRequest= async () =>{
        let methodBody = {sender_email: this.state.sender_email, reciever_email: this.state.reciever_email ,Status: this.state.Status ,request_msg: this.state.request_msg}
        const addRequest = await axios.post("http://localhost:8000/api/requests",methodBody)
        console.log(addRequest)
        if(addRequest.status === 200){
            alert("request have been successfully added")
        }
       else  if(addRequest.status === 400){
          alert("error, we couldn't create request")
      } 
    }

    handleviewRequest = async () => {
      const viewreq = await axios.get(
        "http://localhost:8000/api/requests/viewstatus/" +
          this.state.sender_email
          
      );
      if(viewreq.data.data.Status === true){
        this.setState({showStatus: "true"})
      }
      else if (viewreq.data.data.Status === false){
        this.setState({showStatus: "false"})
      }
      console.log(viewreq.data)
      if (viewreq.status === 200) {
         
          this.setState(
              {
                  sender_email:viewreq.data.data.sender_email,
                  reciever_email:viewreq.data.data.reciever_email ,
                  Status:viewreq.data.data.Status ,
                  request_msg:viewreq.data.data.request_msg ,
                 
                  showMsg:true
              },
              () => console.log(this.state)
            );
        }
      }
      getStyle = () => {
        return {
          background: '#f4f4f4',
          padding: '10px',
          borderBottom: '1px #ccc dotted',
          
        }
    }
  render() {
    return (
      <div style={this.getStyle()}>
        <span>Head mail</span>
        <input type='text' name='sender_email' onChange={this.handleSEmail}/>
        <br/>
        <span>Director Mail</span>
        <input type='text' name='reciever_email' onChange={this.handleREmail}/>
        <br/>
        <span>Request</span>
        <input type='text' name='request_msg' onChange={this.handleMSG}/>
        <br/>
        <button onClick={this.handleAddRequest}>Add Request</button>
        <br/>
        <br/>
        <br/>
        
        <br/>
        <span>enter your mail</span>
        <input type='text' name='sender_email' onChange={this.handleSEmail}/>
        <br/>
        <button onClick={this.handleviewRequest}>view my Requests</button>
        <br/>
        {this.state.showMsg === true ? 
          <div>
            <span>director mail : </span>
          <p> {this.state.reciever_email}</p>
          <span> head mail : </span>
          <p>{this.state.sender_email}</p>
          <span> request status : </span>
          <p>{this.state.showStatus}</p>
          <span> request msg : </span>
          <p>{this.state.request_msg}</p>
         
          </div>
        :null}
      </div>
    )
  }
}

export default AddRequest
