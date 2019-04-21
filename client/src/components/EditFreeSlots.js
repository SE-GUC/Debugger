import React, { Component } from 'react'

export class EditFreeSlots extends Component {
    state = {
        day: "",
        date: "",
        slot: "",
        newDay: "",
        newDate: "",
        newSlot: ""
      }

      onChange = (e) => {this.setState 
        ({day: this.props.oldSlots.day,
        date: this.props.oldSlots.date,
        slot: this.props.oldSlots.slot})
        
        this.setState({ [e.target.name]: e.target.value})}

      onSubmit = (e) => {
          e.preventDefault();
          

          this.props.editSlots(this.state)
          this.setState({day: "",
            date: "",
            slot: "",
            newDay: "",
            newDate: "",
            newSlot: ""
        })
      }

  render() {
    return (
      <div>
       <form>
        <input
            type = "text" 
            name = "newDay"
            placeholder = "New Day"
            value = {this.state.newDay}
            onChange = {this.onChange}
           
            />

            <input
            type="text"
            name = "newDate"
            placeholder = "New Date (MM/DD/YYYY)"
            value = {this.state.newDate}
            onChange = {this.onChange}
            />

            <input
            type="text"
            name = "newSlot"
            placeholder = "New Slot"
            value = {this.state.newSlot}
            onChange = {this.onChange}  
            />

           <button
            onClick = {this.onSubmit}
            >
            Submit changes
            </button>
           
      </form>
      </div>
    )
  }
}

export default EditFreeSlots
