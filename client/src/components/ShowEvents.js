import React, { Component } from 'react'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import Events from "./Events" ;
//import FillEventForm from './FillEventForm';
//import EventsItem from './EventsItem' ;
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export class ShowEvents extends Component {

    state = {

        events : []
      }

    componentWillMount = () => {

       axios.get('http://localhost:8000/api/events' )

       .then(res => 
        
        { 
            console.log(this.state)
            this.setState({events: res.data.data })
        })

       .catch(function(error) {

        console.log("Failed!", error);

      })

 
   }
   
   fillform = (s) => {
     
    axios.post('http://localhost:8000/api/events/filleventforms', 

       { //bodyMethod
        student_id : s.student_id ,
         attendeeName :s.attendeeName ,
        phoneNumber : s.phoneNumber ,
        email : s.email ,
     nationalidCardNumber : s.nationalidCardNumber ,
       }
        )     



    .then( res => {
       console.log(res.data)
        
         
       alert ("submitted")}
   
    
    )



    .catch(function(error) {



       alert(error.message);



  })



}
   render() {

    return (

 
      <div>
 
        <Events events = {this.state.events} fillform= {this.fillform}/>
        
 
      </div>
    )
  }
}

export default ShowEvents ;