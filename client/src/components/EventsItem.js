import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FillEventForm from "./FillEventForm" ;

import PropTypes from 'prop-types';
//require('bootstrap') 
export class EventsItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      
    }
  }
  render() {
    return (
      
      <div style={this.getStyle()}>
        {this.props.event.eventName} 
        {this.props.event.description} 
        {this.props.event.date}
        <FillEventForm eventId= {this.props.event._id} fillform={this.props.fillform}/>
        
        


      </div>
    )

  }
}
EventsItem.propTypes = {
  event: PropTypes.object.isRequired 
 //iIfillform : PropTypes.func.isRequired
}
export default EventsItem ;