import React, { Component } from 'react'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
// import HeadFreeSlots from './HeadFreeSlots';
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
//const email = 'ahmed@gmail.com'

export class CreateFreeSlots extends Component {
    state = {
        day: "",
        date: "",
        slot: ""
      }

      onChange = (e) => this.setState({ [e.target.name]: e.target.value})

      onSubmit = (e) => {
          e.preventDefault();
          this.props.createSlots(this.state)
          this.setState({day: "",
                date: "",
                slot: ""
        })
      }
    
  render() {
    return (
        <div> 
      <form>
      <br/>
        <h6>Add new Slot </h6>
        <input
            type = "text" 
            name = "day"
            placeholder = "Day"
            value = {this.state.day}
            onChange = {this.onChange}
           
            />

            <input
            type="text"
            name = "date"
            placeholder = "Date (MM/DD/YYYY)"
            value = {this.state.date}
            onChange = {this.onChange}
            />

            <input
            type="text"
            name = "slot"
            placeholder = "Slot"
            value = {this.state.slot}
            onChange = {this.onChange}  
            />

           <button
            onClick = {this.onSubmit}
            >
            Create
            </button>
           
      </form>
      <br />
      </div> 
    )
  }
}

export default CreateFreeSlots;
