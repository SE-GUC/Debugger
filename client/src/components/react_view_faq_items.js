import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class react_Faq_view_items extends Component {
  render() {
    return (
      <div>
        <form>{this.props.faq.question} {this.props.faq.askedBy} {this.props.faq.noOfTimes}
         {this.props.faq.answer} {this.props.faq.answeredBy}  {this.props.faq.date}
         </form>
      </div>
    )
  }
}

react_Faq_view_items.propTypes = {
    faq: PropTypes.object.isRequired
}

export default react_Faq_view_items