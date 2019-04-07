import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';






class react_view_faq extends Component {
    render() {
      return this.props.react_view_faq.map((question) => (
        <react_view_faq_items key={question._id} faq= {faq}/>
      ))
    }
  }
  
  react_view_faq.propTypes = {
      react_view_faq: PropTypes.array.isRequired
  }
  
  export default react_view_faq;






/*class react_view_faq extends Component {
    constructor(props){
        super(props)
        this.state = { user: { _id: "'5c966e60569bd218bcdb2ec0'",question: " ", askedBy: " ", answer: " ", password: " ", birthDay: " ", studyYear: " ", modeOfTran: " ", generalAddress: " ", clubName: " "}}
        axios.get("http://localhost:8000/api/faq/getFaqs").then(res => this.setState({ faq: res.data}))
    }

    render() {
        return (
            <div className="react_view_faq">
                question {this.state.faq.question} <br/>
                askedBy {this.state.faq.askedBy} <br/>
                noOfTimes {this.state.faq.noOfTimes} <br/>
                answer {this.state.faq.answer} <br/>
                answeredBy {this.state.faq.answeredBy} <br/>
                date {this.state.faq.date} <br/>
                
            </div>
        )
    }

   


}
export default react_Faq_view;*/