import React, { Component } from 'react'

export class EditFaq extends Component {
    state = {
        question: "",
        askedBy: "",
        noOfTimes: "",
        answer: "",
        answeredBy: "",
        date: ""
      }

      onChange = (e) => {this.setState({question: this.props.oldfaq.question,
        askedBy: this.props.oldfaq.askedBy,
        noOfTimes: this.props.oldfaq.noOfTimes,
        answer: this.props.oldfaq.answer,
        answeredBy: this.props.oldfaq.answeredBy,
        date: this.props.oldfaq.date   
    
    })
        
        this.setState({ [e.target.id]: e.target.value})}

      onSubmit = (e) => {
          e.preventDefault();
          

          this.props.EditFaq(this.state)
          this.setState({
            question: "",
            askedBy: "",
            noOfTimes: "",
            answer: "",
            answeredBy: "",
            date: "",

            newquestion: "",
            newaskedBy: "",
            newnoOfTimes: "",
            newanswer: "",
            newansweredBy: "",
            newdate: ""
            




        })
      }

  render() {
    return (
      <div>
       <form>
        <input
            type = "text" 
            name = "question"
            placeholder = "New question"
            value = {this.state.newquestion}
            onChange = {this.onChange}
           
            />

          <input
            type="text"
            name = "newaskedBy"
            placeholder = "newaskedBy"
            value = {this.state.newaskedBy}
            onChange = {this.onChange}  
            />



        <input
            type = {Number} 
            name = "newnoOfTimes"
            placeholder = "newnoOfTimes"
            value = {this.state.newnoOfTimes}
            onChange = {this.onChange}
           
            />

          <input
            type="text"
            name = "newanswer"
            placeholder = "newanswer"
            value = {this.state.newanswer}
            onChange = {this.onChange}  
            />

        
          <input
            type="text"
            name = "newansweredBy"
            placeholder = "newansweredBy"
            value = {this.state.newansweredBy}
            onChange = {this.onChange}  
            />


            <input
            type="text"
            name = "newDate"
            placeholder = "New Date (MM/DD/YYYY)"
            value = {this.state.newDate}
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

export default EditFaq
