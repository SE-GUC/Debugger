import React, { Component } from 'react';
import EventsItem from './EventsItem';
import PropTypes from 'prop-types';

export class Events extends Component {
  render() {
    return this.props.events.map((event) => (
      <EventsItem key={event._id} event={event} fillform={this.props.fillform}  />
    ));
  }
}

// PropTypes
Events.propTypes = {
  events: PropTypes.array.isRequired,
  //fillform: PropTypes.func.isRequired
}

export default Events;