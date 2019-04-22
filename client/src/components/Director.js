import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditRequest from './EditRequest'
import Presidentedit from './Presidentedit'
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
    <a href="/presidentedit">Director edit member</a>
    <br/>

    <Switch>
    <Route path="/EditRequest" component={EditRequest}/>
    <Route path="/presidentedit" component={Presidentedit}/>

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
