import React, { Component } from "react";
import Logout from "../Logout";
import {connect} from "react-redux";
import {Enum_userType} from '../../Enums/Enums'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Enum_appStatus} from '../../Enums/Enums'

export class Navbar extends Component {


  getAppStatusValue = (value)=>{
    return "App Status : "+ Enum_appStatus.getKey(value)
 }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand">
            AWG
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">              
           
              <li className="nav-item">
                <a className="nav-link" href="/AppForm">
                Application Form
                </a>
              </li>
            
              <li className="nav-item">
                <a className="nav-link" href="/Vote">
                Create Vote
                </a>
              </li>

            {this.props.usrId===null?
              <li className="nav-item">
                <a className="nav-link" href="/Login">
                Login
                </a>
              </li>:null}

            {this.props.usrId===null?
              <li className="nav-item">
              <a className="nav-link" href="/Registration">
              Registration
                </a>
              </li>:null}

              <li className="nav-item">
              <a className="nav-link" href="/SubmitVote">
              Give your Vote
                </a>
              </li>
            
            {this.props.usrType === (Enum_userType.President.value||Enum_userType.Director.value||Enum_userType.Head.value )? 
              <li>
              <a className="nav-link" href="/viewApplications">
              View Applications
                </a>
              </li> : null}
             
            <li className="nav-item">

                 {this.props.vgsUsrId!==null?this.getAppStatusValue(this.props.appStatus):""}
              </li> 

              <li className="nav-item">
              <a className="nav-link" href="/vgs_features_page">
              President-Head-Features
                </a>
              </li>
             
              <li>
              <a className="nav-link" href="/CreateFaq">
              Faq Section to ask
                </a>
              </li>


              <li>
              <a className="nav-link" href="/GetFaq">
              Faq Section view
                </a>
              </li>

             
              <li>
              <a className="nav-link" href="/ShowFreeSlots">
              My Free Slots
                </a>
              </li> 

            { this.props.usrId!==null?
              <li className="nav-item">
              <a className="nav-link" href="/">
              <Logout />
                </a>
              </li>:null }
     
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    usrId:state.userId,
    vgsUsrId:state.VGSUserId,
    usrType: state.userType,
   appStatus: state.appStatus
  }
}
export default connect(mapStateToProps)(Navbar)
