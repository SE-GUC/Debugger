import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Head from './Head'
import President from './President';
import Director from './Director'
import ViewAllUsersAndDelete from './ViewAllUsersAndDelete'
export class VgsFeaturesPage extends Component {
  render() {
    return (
      <Router>
      <div>
        <a href="/presidentfeatures">president</a>
        <br/>
        <a href="/headfeatures">Head</a>
        <br/>
        <a href="/Director"> Director features</a>
        <br/>
        <a href="/ViewAllUsersAndDelete"> View All Users And Delete</a>
        <br/>
        <Switch>
           <Route path="/headfeatures" component={Head} />
           <Route path="/presidentfeatures" component={President} />
           <Route path="/Director" component={Director}/>
           <Route path="/ViewAllUsersAndDelete" component={ViewAllUsersAndDelete}/>
          </Switch>
      </div>
      </Router>
    )
  }
}

export default VgsFeaturesPage
