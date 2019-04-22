import React, { Component } from 'react';
import OneInterview from './OneInterview';
import PropTypes from 'prop-types';

class Interviews extends Component {
  render() {
    return this.props.interview.map((slot) => (
            <OneInterview boothMember = {this.props.boothMember} key={slot._id} slot= {slot} 
            editInterviews = {this.props.editInterviews}/> )
            
    )
  }
}

Interviews.propTypes = {
    
    interview: PropTypes.array.isRequired,
    boothMember: PropTypes.bool.isRequired,
    editInterviews: PropTypes.func.isRequired

}

export default Interviews;