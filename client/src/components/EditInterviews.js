import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EditInterviews extends Component {
    state = {
        interviewerEmail: "",
        intervieweeEmail: "",
        day: "",
        date: "",
        interviewslot: "",
        startTime: "",
        endTime: "",
        interview : ""
      }


      onChange = (e) => {this.setState ({interviewerEmail: this.props.oldSlots.interviewerEmail,
        day: this.props.oldSlots.day,
        date: this.props.oldSlots.date,
        interviewslot: this.props.oldSlots.interviewslot})

        this.setState({ [e.target.name]: e.target.value})}

      onSubmit = (e) => {
          e.preventDefault();
          this.props.editInterviews(this.state)
          this.setState({interviewerEmail: "",
                intervieweeEmail: "",
                day: "",
                date: "",
                interviewslot: "",
                startTime: "",
                endTime: "",
                interview : ""
        })
      }

  render() {
    return (
      <div>
       <form>
           <input
                type = "text" 
                name = "intervieweeEmail"
                placeholder = "New Interviewee Email"
                value = {this.state.intervieweeEmail}
                onChange = {this.onChange}
            />

           <input
                type = "text" 
                name = "interviewslot"
                placeholder = "New Interview Slot"
                value = {this.state.interviewslot}
                onChange = {this.onChange}
                style = {{width : "140px"}}
            />
        
            <input
                type="text"
                name = "startTime"
                placeholder = "New Start Time (00:00)"
                value = {this.state.startTime}
                onChange = {this.onChange}
            />

            <input
                type="text"
                name = "endTime"
                placeholder = "New End Time (00:00)"
                value = {this.state.endTime}
                onChange = {this.onChange}  
            />

            <input
                type="text"
                name = "interview"
                placeholder = "Is there an Interview? (true/ false)"
                value = {this.state.interview}
                onChange = {this.onChange} 
                style = {{width : "240px"}}
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

EditInterviews.propTypes = {

    oldSlots: PropTypes.object.isRequired,
    editInterviews: PropTypes.func

}

export default EditInterviews