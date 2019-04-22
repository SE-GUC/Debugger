import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditRequest from './EditRequest'
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'

export class Director extends Component {
  render() {
    return (

        <div>

     {this.props.usrType===(Enum_userType.Director.value)?

      <Router>

    <div>

    <a href="/EditRequest"> Director Update Request</a>

    <br/>

    <Switch>
    <Route path="/EditRequest" component={EditRequest}/>
   
    </Switch>
      </div>
      </Router>:
      <div className="alert alert-denger">

      <strong>warning </strong>you are not allowed to view this page
     </div> }
      </div>
  ) 
}
}

const mapStateToProps =(state)=>{
    return{

      usrType:state.userType 
    }
  }

export default  connect (mapStateToProps)(Director)
