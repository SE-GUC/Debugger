import React, { Component } from 'react';
import HeadFreeSlotItem from './HeadFreeSlotItem';
import PropTypes from 'prop-types';

class HeadFreeSlots extends Component {
  render() {
    return this.props.headFreeSlots.map((slot) => (
      <HeadFreeSlotItem key={slot._id} slot= {slot}/>
    ))
  }
}

HeadFreeSlots.propTypes = {
    headFreeSlots: PropTypes.array.isRequired
}

export default HeadFreeSlots;