import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class HeadFreeSlotItem extends Component {
  render() {
    return (
      <div>
        <form>{this.props.slot.day} {this.props.slot.date} {this.props.slot.slot}</form>
      </div>
    )
  }
}

HeadFreeSlotItem.propTypes = {
    slot: PropTypes.object.isRequired
}

export default HeadFreeSlotItem
