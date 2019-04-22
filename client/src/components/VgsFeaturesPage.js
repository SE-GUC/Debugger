import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Head from './Head'
import President from './President';
export class VgsFeaturesPage extends Component {
  render() {
    return (
      <Router>
      <div>
        <a href="/presidentfeatures">president</a>
        <br/>
        <a href="/headfeatures">Head</a>
        <br/>
        <Switch>
           <Route path="/headfeatures" component={Head} />
           <Route path="/presidentfeatures" component={President} />
          </Switch>
      </div>
      </Router>
    )
  }
}

export default VgsFeaturesPage
