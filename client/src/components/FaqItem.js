import React, { Component } from 'react'
import PropTypes from 'prop-types';
import EditFaq from "./EditFaq"
export class FaqItem extends Component {
    render() {
      return (
        // <Router>
          <div>
            <div>
                {this.props.faq.question} 
                {this.props.faq.askedBy} 
                {this.props.faq.noOfTimes}
                {this.props.faq.answer} 
                {this.props.faq.answeredBy} 
                {this.props.faq.date}
         
          
          </div>
           <EditFaq oldSfaq = {this.props.faq} 
           EditFaq = {this.props.EditFaq} /> 
          <br />
          
          </div>
          // </Router>
      )
    }
  }
  
  FaqItem.propTypes = {
      faq: PropTypes.object.isRequired
  }
  
  export default FaqItem
  
  