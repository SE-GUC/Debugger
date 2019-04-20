import React, { Component } from 'react'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import HeadFreeSlots from './HeadFreeSlots';
import CreateFreeSlots from './CreateFreeSlots';
import axios from 'axios'
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'
//import querystring from 'qs'
//import { stringify } from 'querystring';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

//const newSlots =[]
export class ShowFreeSlots extends Component {
 
    state = {
      email: '',
      freeSlots: []
    
  }

  getUserEmail = (id) => {
    
    return axios.get('http://localhost:8000/api/profile/' + id)
   // .then(res => user= res.data.data.email)
     .then(res =>  {
       this.setState({email: res.data.data.email})
      
     })
         .catch(function(error) {
          console.log("Failed!", error);
         })
        
    
    //console.log(this.props.userId)
    
 }

  componentDidMount = async() => {
    // If logged in
    // Messages
       await this.getUserEmail(this.props.userId)
       console.log(this.state)
       axios.get('http://localhost:8000/api/headFreeSlots/' + this.state.email)
       .then(res => {this.setState({freeSlots: res.data })
       console.log(this.state)
       })
       .catch(function(error) {
        console.log("Failed!", error);
        
      })

  }


  getUserType = (v)=>{
    return Enum_userType.getKey(v)
 }
   

    onChange = (e)=>{
      console.log([e.target.value])
    }

    createSlots = (s) => {
        console.log(s)
        axios.post('http://localhost:8000/api/headFreeSlots/add', 
        {
            email: this.state.email,
            day: s.day,
            date: s.date,
            slot: s.slot
             
        })     
    
        .then(res => {this.setState({freeSlots: res.data})
              alert("Your Slot was Successfully added")})
        .catch(function(error) {
           alert(error.message);
      })
        
    }

     editSlots =(s) => {
        console.log(s)
        axios.put('http://localhost:8000/api/headFreeSlots/update/', 
        {
            email: this.state.email,
            oldDayToBeChanged: s.day,
            oldDateToBeChanged: s.date,
            oldSlotToBeChanged: s.slot,
            newDay: s.newDay,
            newDate: s.newDate,
            newSlot: s.newSlot
        })     
    
        .then(res => { this.setState({freeSlots: res.data})
             alert("Your Slot was Successfully updated")})
            
        .catch(function(error) {
           alert(error.message);
      })
     }


  render() {
  if (this.props.userId){ 
   if (this.props.userType === Enum_userType.Head.value){
     if (this.state.freeSlots.length > 0){
      return (
        <div>
        <CreateFreeSlots createSlots = {this.createSlots}/>
        <HeadFreeSlots editSlots = {this.editSlots} headFreeSlots = {this.state.freeSlots} />
       </div>
      )
     }

     else {
      return(
        <div className="alert alert-info">
           <strong> Note: </strong> You don't have Free Slots yet
        </div>
      )
     }
    }
    else {
      return(
        <div className="alert alert-danger">
           <strong>Warning !</strong> You are not authorized to view this page since you are not a Head
        </div>
      )
    }
  }

  else{
    return(
      <div className="alert alert-danger">
         <strong>Warning !</strong> You are not logged in to view this page
      </div>
    )
  }
}

}
const mapStateToProps = (state)=>{
  return {
    userId: state.userId,
    userType: state.userType
  }
}
export default connect(mapStateToProps)(ShowFreeSlots)
//export default ShowFreeSlots
