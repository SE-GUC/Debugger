import React, { Component } from 'react'
import PropTypes from 'prop-types';
//import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
//import {Link} from 'react-router-dom'
import EditFreeSlots from "./EditFreeSlots"


export class HeadFreeSlotItem extends Component {
  render() {
    return (
      // <Router>
        <div>
          <div>
    {this.props.slot.day} {this.props.slot.date} {this.props.slot.slot}{/*<Link to = {'/editSlot'}> edit </Link>*/}
           
         {/* <Switch>
              <Route  path="/editSlot" component={EditFreeSlots} />
            </Switch>  */}
       
        
        </div>
         <EditFreeSlots oldSlots = {this.props.slot} editSlots = {this.props.editSlots} /> 
        <br />
        
        </div>
        // </Router>
    )
  }
}

HeadFreeSlotItem.propTypes = {
    slot: PropTypes.object.isRequired,
    editSlots: PropTypes.func.isRequired
}

export default HeadFreeSlotItem

