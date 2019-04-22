import React, { Component } from 'react';
//import EventsItem from './EventsItem' ;
//import Events from './Events' ;

import PropTypes from 'prop-types';

export class FillEventForm extends Component {
  state = {
    student_id :'' ,
    attendeeName : '' ,
    phoneNumber : '' ,
    email : '' ,
    nationalidCardNumber : ''
  }
  onChange = (e) => { 
    this.setState({ [e.target.name]: e.target.value})
console.log(this.state)
   }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.fillform(this.props.eventId,this.state);
  // console.log(this.state)
    this.setState({ 
        student_id : '' ,
    attendeeName : '' ,
    phoneNumber : '' ,
    email : '' ,
    nationalidCardNumber : '' 
})
console.log(this.state);
  }

  

  render() {
    return (

        <div className = "container"> 
      <div>
      <br/>
        <h6>Fill event form </h6>

        <input
            type = "text" 
            name = 'student_id'
            placeholder = "Student_id"
          value = {this.state.student_id }
            onChange = {this.onChange}
/>
<input

            type = "text" 
            name = "attendeeName"
            placeholder = "AttendeeName"
           value = {this.state.attendeeName }
            onChange = {this.onChange}
/>
<input

            type = "text" 
            name = "phoneNumber"
            placeholder = "PhoneNumber"
            value = {this.state.phoneNumber}
            onChange = {this.onChange}
/>
<input

            type = "text" 
            name = "email"
            placeholder = "Email"
           value = {this.state.email}
            onChange = {this.onChange}
/>
<input

            type = "text" 

            name = "nationalidCardNumber"
            placeholder = "NationalidCardNumber"
           value = {this.state.nationalidCardNumber}
            onChange = {this.onChange}
/>
<button

onClick = {this.onSubmit}

>

Submit

</button>


</div>

<br />

</div> 

)



}



}




     

// PropTypes
FillEventForm.propTypes = {
  fillform: PropTypes.func.isRequired
}

export default FillEventForm  ;