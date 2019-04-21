import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PresidentDelete from './PresidentDelete'
import Presidentedit from './Presidentedit'
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'
import Note from './Note'

export class President extends Component {
  render() {
    return (
      <div>
     {this.props.usrType===(Enum_userType.President.value||Enum_userType.Director.value)?
      <Router>
    <div>
    <a href="/note">add note</a>
    <br/>
    <a href="/president">President Delete</a>
    <br/>
    <a href="/presidentedit">president edit member</a>
    <br/>
    <Switch>
    <Route path="/note" component={Note} />
    <Route path="/president" component={PresidentDelete} />
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


export default connect (mapStateToProps)(President)

