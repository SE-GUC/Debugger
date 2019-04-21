import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { EditInterviews } from './EditInterviews';
import {Enum_userType} from '../Enums/Enums'
import {connect} from "react-redux";
//import EditFreeSlots from "./EditFreeSlots"

export class OneInterview extends Component {
  render() {

      if (this.props.boothMember || (this.props.userType === Enum_userType.President.value)||
        (this.props.userType === Enum_userType.Director.value)||
        (this.props.userType === Enum_userType.Head.value)){
        return (
          <div>
            <div className = "container">
                <table className = "table">
                    <tbody>
                        <tr>
                            <td> {this.props.slot.interviewerEmail} </td>
                            <td> {this.props.slot.intervieweeEmail+""}  </td>
                            <td> {this.props.slot.day}</td>
                            <td> {this.props.slot.date}</td>
                            <td> {this.props.slot.interviewslot}</td>
                            <td> {this.props.slot.startTime +""} </td>
                            <td> {this.props.slot.endTime +""} </td>
                            <td> {this.props.slot.interview + ""} </td>
                        </tr>
                        </tbody>
                    </table> 
                    <EditInterviews oldSlots = {this.props.slot} editInterviews = {this.props.editInterviews} />
                </div>
            <br/>
            <br/>
            <br />
            </div>
        )
      }

      else{
          return(
            <div>
            <div className = "container">
                <table className = "table">
                    <tbody>
                        <tr>
                          <td> {this.props.slot.interviewerEmail} </td>
                          <td> {this.props.slot.intervieweeEmail+""}  </td>
                          <td> {this.props.slot.day}</td>
                          <td> {this.props.slot.date}</td>
                          <td> {this.props.slot.interviewslot}</td>
                          <td> {this.props.slot.startTime +""} </td>
                          <td> {this.props.slot.endTime +""} </td>
                          <td> {this.props.slot.interview + ""} </td>
                        </tr>
                      </tbody>
                  </table>        
              </div>
          </div>
          )
      }
  }
}

OneInterview.propTypes = {

    boothMember: PropTypes.bool.isRequired,
    slot: PropTypes.object.isRequired,
    editInterviews: PropTypes.func.isRequired

}

const mapStateToProps = (state)=>{
    return {
      userId: state.userId,
      userType: state.userType
    }
  }
  
  export default connect(mapStateToProps)(OneInterview)