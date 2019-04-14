import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeadFreeSlots from "./components/HeadFreeSlots";
import axios from "axios";
import "./App.css";
import AppForm from "./components/AppForm";
import Vote from "./components/Vote";
import Login from "./components/Login"
import Registration from "./components/Registration";
import Navbar from "./components/customComponents/Navbar";
import SubmitVote from "./components/SubmitVote"
import ViewAppForms from "./components/ViewAppForms"
import VgsFeaturesPage from './components/VgsFeaturesPage'
import PresidentDelete from './components/PresidentDelete'
import HeadDelete from './components/HeadDelete'
import Note from './components/Note'
import HeadAddMember from './components/HeadAddMember'

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
          <Navbar/>
          {/* <a href="/AppForm">Application Form</a>
          <br />
          <a href="/Vote">Create Vote</a>
          <br />
          <a href="/Login">Login</a>
          <br />
          <a href="/Registration">Registration</a> */}
          <Switch>
            <Route path="/AppForm" component={AppForm} />
            <Route path="/Vote" component={Vote} />
            <Route path="/Login" component={Login} />
            <Route path="/Registration" component={Registration} />
            <Route path="/SubmitVote" component={SubmitVote} />
            <Route path="/viewApplications" component={ViewAppForms} />
            <Route path="/vgs_features_page" component={VgsFeaturesPage}/>

            <Route path="/president" component={PresidentDelete} />
            <Route path="/head" component={HeadDelete} />
            <Route path="/note" component={Note} />
            <Route path="/headAddMember" component={HeadAddMember} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
