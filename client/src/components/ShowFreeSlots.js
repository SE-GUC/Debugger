import React, { Component } from 'react'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import HeadFreeSlots from './HeadFreeSlots';
import CreateFreeSlots from './CreateFreeSlots';
import axios from 'axios'
//import querystring from 'qs'
//import { stringify } from 'querystring';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
const email = 'ahmed@gmail.com'
//const newSlots =[]
export class ShowFreeSlots extends Component {
    state = {
        freeSlots: []
      }
    
    componentWillMount = () => {
       axios.get('http://localhost:8000/api/headFreeSlots/' + email)
       .then(res => this.setState({freeSlots: res.data }))
       .catch(function(error) {
        console.log("Failed!", error);
      })
    
    }

    onChange = (e)=>{
      console.log([e.target.value])
    }

    createSlots = (s) => {
        console.log(s)
        axios.post('http://localhost:8000/api/headFreeSlots/add', 
        {
            email: email,
            day: s.day,
            date: s.date,
            slot: s.slot
             
        })     
    
        .then(res => this.setState({freeSlots: res.data}))
        .catch(function(error) {
           alert(error.message);
      })
        
    }

     editSlots =(s) => {
        console.log(s)
        axios.put('http://localhost:8000/api/headFreeSlots/update/', 
        {
            email: email,
            oldDayToBeChanged: s.day,
            oldDateToBeChanged: s.date,
            oldSlotToBeChanged: s.slot,
            newDay: s.newDay,
            newDate: s.newDate,
            newSlot: s.newSlot
        })     
    
        .then(res => this.setState({freeSlots: res.data}))
            
        .catch(function(error) {
           alert(error.message);
      })
     }


  render() {
    return (
      <div>
        <CreateFreeSlots createSlots = {this.createSlots}/>
        <HeadFreeSlots editSlots = {this.editSlots} headFreeSlots = {this.state.freeSlots} />
       {/* editSlots = {this.editSlots}/> */}
      </div>
    )
  }
}

export default ShowFreeSlots
