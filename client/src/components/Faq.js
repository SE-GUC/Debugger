import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Faq extends Component {
  render() {
    return this.props.Faq.map((faq) => (
      <Faq key={faq._id}
       faq= {faq} 
       Editfaq oldfaq = {this.props.Editfaq}/>
      
    ))
  }
}

Faq.propTypes = {
    faq: PropTypes.array.isRequired
}

export default Faq;