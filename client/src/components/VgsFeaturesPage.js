import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PresidentDelete from './PresidentDelete'
import HeadDelete from './HeadDelete'
import Note from './Note'
import HeadAddMmeber from './HeadAddMember'
export class VgsFeaturesPage extends Component {
  render() {
    return (
      <Router>
      <div>
        <a href="/president">President Delete</a>
        <br/>
        <a href="/note">add note</a>
        <br/>
        <a href="/head">head delete</a>
        <br/>
        <a href="/headAddMember">head add member</a>

        <Switch>
            <Route path="/president" component={PresidentDelete} />
            <Route path="/head" component={HeadDelete} />
            <Route path="/note" component={Note} />
            <Route path="/headAddMember" component={HeadAddMmeber}/>
          </Switch>
      </div>
      </Router>
    )
  }
}

export default VgsFeaturesPage
