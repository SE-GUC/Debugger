import React, { Component } from 'react'
import axios from 'axios';


export class EditRequest extends Component {
    constructor(props){
        super(props);
        this.state= {
          sender_email:"",
          reciever_email:"" ,
          RequestID : "" ,
          Status : false ,
          request_msg : "",
          showMsg:false,
          showStatus : ""
        }
       
        this.handleREmail = this.handleREmail.bind(this);   
    }

  

    handleREmail = (event) =>{
      event.persist();
     this.setState({reciever_email: event.target.value},()=>(console.log(this.state)))
  }
 
  handleRequestID = (event) =>{
    event.persist();
    this.setState({RequestID: event.target.value},()=>(console.log(this.state)))
}
handleStatus = (event) =>{
  event.persist();
  this.setState({Status: event.target.value},()=>(console.log(this.state)))
}

  handleviewreq = async () => {
    const viewreq = await axios.get(
      "http://localhost:8000/api/requests/viewrequest/" +
        this.state.reciever_email
        
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
                RequestID :viewreq.data.RequestID.RequestID,
                showMsg:true
            },
            () => console.log(this.state)
          );
      }
     // else if(getApps.status ===203){
       // this.setState({ allApps: [] }, () => console.log(this.state.allApps));
      //}

    }

    handleupdateRequest= async () =>{
      let methodBody = {Status: this.state.Status ,RequestID: this.state.RequestID}
      const addRequest = await axios.put("http://localhost:8000/api/requests/edit_requests/" +this.state.RequestID,methodBody)
      console.log(addRequest)
      if(addRequest.status === 200){
          alert("request is updated")}
          else if (addRequest.status === 400){
            alert("cannot edit request  , id not found")
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
        <span>Director Mail</span>
        <input type='text' name='reciever_email' onChange={this.handleREmail}/>
        
        <br/>
        <button onClick={this.handleviewreq}>Show Requests</button>
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
          <span> request id : </span>
          <div>{this.state.RequestID}</div>
          </div>
        :null}
        <br/>
        <span>Request ID</span>
        <input type='text' name='RequestID' onChange={this.handleRequestID}/>
        <br/>
        <span>Request status</span>
        <input type='text' name='Status' onChange={this.handleStatus}/>
        <br/>
        <button onClick={this.handleupdateRequest}>update Request </button>
      </div>
    )
  }
}

export default EditRequest
