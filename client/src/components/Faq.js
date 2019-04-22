import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditFaq from './EditFaq'
import CreateFaq from './CreateFaq'
import GetFaq from './GetFaq'
export class Faq extends Component {
  render() {
    return (
      <Router>
      <div>
        <a href="/CreateFaq">Create a Question</a>
        <br/>
        <a href="/GetFaq">Show Faqs</a>
        <br/>
        <a href="/EditFaq">Edit FAQ</a>

        <Switch>
            <Route path="/CreateFaq" component={EditFaq} />
            <Route path="/GetFaq" component={CreateFaq} />
            <Route path="/EditFaq" component={GetFaq} />
          </Switch>
      </div>
      </Router>
    )
  }
}

export default Faq
