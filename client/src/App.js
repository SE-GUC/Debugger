import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import ShowEvents from "./components/ShowEvents";
import AppForm from "./components/AppForm";
import Vote from "./components/Vote";
import ShowFreeSlots from "./components/ShowFreeSlots";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Navbar from "./components/customComponents/Navbar";
import SubmitVote from "./components/SubmitVote"
import ViewAppForms from "./components/ViewAppForms"
import VgsFeaturesPage from './components/VgsFeaturesPage'
import PresidentDelete from './components/PresidentDelete'
import HeadDelete from './components/HeadDelete'
import Note from './components/Note'
import HeadAddMember from './components/HeadAddMember'
import CreateFaq from './components/CreateFaq'
import ViewAllUsersAndDelete from './components/ViewAllUsersAndDelete'
import AssignBoothMembers from './components/AssignBoothMembers'
//import ViewUserItem from './components/ViewUserItem'
//import ViewUsers from './components/ViewUsers'
import GetFaq from './components/GetFaq'
import AppFormEdit from './components/AppFormEdit'
import imageComponent from './components/imageComponent'
import ShowInterviews from "./components/ShowInterviews";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <a href="/ShowFreeSlots">My Free Slots</a> */}
          {/* <a href="/ShowEvents"> Events </a> */}
          <Navbar />
          <Switch>
            <Route path="/ShowFreeSlots" component={ShowFreeSlots} />
            <Route path="/ShowInterviews" component={ShowInterviews} />
            <Route path="/AssignBoothMembers" component={AssignBoothMembers} />

            <Route path="/AppForm" component={AppForm} />
            <Route path="/AppFormEdit" component={AppFormEdit} />
            <Route path="/Vote" component={Vote} />
            <Route path="/Login" component={Login} />
            <Route path="/Registration" component={Registration} />
            <Route path="/SubmitVote" component={SubmitVote} />
            <Route path="/viewApplications" component={ViewAppForms} />

            <Route path="/vgs_features_page" component={VgsFeaturesPage} />
            <Route path="/president" component={PresidentDelete} />
            <Route path="/head" component={HeadDelete} />
            <Route path="/note" component={Note} />
            <Route path="/headAddMember" component={HeadAddMember} />

            <Route path="/CreateFaq" component={CreateFaq} />
            <Route path="/ViewAllUsersAndDelete" component={ViewAllUsersAndDelete} />
            <Route path="/GetFaq" component={GetFaq} />

            <Route path="/ShowEvents" component={ShowEvents} />

            <Route path="/" component={imageComponent}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
