import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeadFreeSlots from "./components/HeadFreeSlots";
import axios from "axios";
import "./App.css";
import AppForm from "./components/AppForm";
import Vote from "./components/Vote";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const email = "ahmed@gmail.com";
class App extends Component {
  state = {
    freeSlots: []
  };

  viewSlots = email => {
    axios
      .get("http://localhost:8000/api/headFreeSlots/" + email)
      .then(res => this.setState({ freeSlots: res.data }))
      .catch(function(error) {
        console.log("Failed!", error);
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <p>Welcome</p>
          <p>
            <button onClick={() => this.viewSlots(email)}>
              My Free Slots{" "}
            </button>
          </p>
          <HeadFreeSlots headFreeSlots={this.state.freeSlots} />
          <h1>Yelloo</h1>
          <a href="/AppForm">Application Form</a>
          <br />
          <a href="/Vote">Create Vote</a>
          <Switch>
            <Route path="/AppForm" component={AppForm} />
            <Route path="/Vote" component={Vote} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
