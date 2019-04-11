import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import VGS_User from "./models/VGS_User";
import AppForm from "./components/AppForm";
import Vote from "./components/Vote";

class App extends Component {

  render() {
    return (
      <div className="App">
        
          <h1>Yelloo</h1>
          <a href="/AppForm">Application Form</a>
          <br/>
          <a href="/Vote">Create Vote</a>
          <Switch>
          <Route path="/AppForm" component={AppForm} />
          <Route path="/Vote" component={Vote} />
          </Switch>
        
      </div>
    );
  }
}

export default App;
