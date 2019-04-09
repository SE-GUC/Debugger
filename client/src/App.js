import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import VGS_User from "./models/VGS_User";
import AppForm from "./components/AppForm";

class App extends Component {
  //   this.

  //   this.changingEmail = this.changingEmail.bind(this);
  constructor(props) {
    super(props);
    this.state = {
      VGS_User,
      Applicants: []
    };
  }

  vgs = new VGS_User();
  //VGS_User = new  VGS_User('lol@jf.com',1,'tre2ak a5dar','eating',3,'NA')
  switchNameHandler = () => {
    console.log("Hola!");
    console.log(this.VGS_User.email);
  };

  changingEmail = event => {
    this.setState({
      VGS_User: (this.vgs.email = event.target.value)
    });
    //  this.VGS_User.email=event.target.value;
    //  console.log(VGS_User.email=event.target.value)
  };

  printobject(user) {
    // console.log(user);
    //this.setState({
    //Applicants:
    this.state.Applicants.concat(user);
    //});

    //Applicants.push(user)
    console.log(this.Applicants);
    console.log(this.Applicants.length);
  }

  render() {
    return (
      <div className="App">
        <switch>
          <h1>Yelloo</h1>
          {/* <button onClick={this.switchNameHandler}>Switch Name</button> */}
          {/* <TestCom
          user={this.vgs}
          addObject={this.printobject}
          Changed={this.changingEmail}
        /> */}
          {/* <TestCom obj={this.VGS_User} ass={this.VGS_User.email} Changed={this.changingEmail}></TestCom> */}
          {/* <div>abc {VGS_User.email}</div> */}
          {/* <div>{this.obj.name}</div> */}
          <a href="/AppForm">Application Form</a>
          <Route path="/AppForm" component={AppForm} />
          <Route path="/" component={App} />
          {/* <AppForm/> */}
        </switch>
      </div>
    );
  }
}

export default App;
