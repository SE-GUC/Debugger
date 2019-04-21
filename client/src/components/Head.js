import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeadDelete from './HeadDelete'
import HeadAddMmeber from './HeadAddMember'
import Note from './Note'
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'


export class Head extends Component {
  render() {
    return (
        <div>
     {this.props.usrType===(Enum_userType.Head.value)?
      <Router>
    <div>
    <a href="/head">head delete</a>
    <br/>
    <a href="/headAddMember">head add member</a>
    <br/>
    <a href="/note">add note</a>
    <br/>
   
   
    <Switch>
    <Route path="/head" component={HeadDelete} />
    <Route path="/headAddMember" component={HeadAddMmeber}/>
    <Route path="/note" component={Note} />
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
  
export default  connect (mapStateToProps)(Head)

