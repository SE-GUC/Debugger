import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Events from "./components/Events" ;
import FillEventForm from "./components/FillEventForm" ;
import ShowEvents from "./components/ShowEvents" ;

//require('bootstrap')
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";



class App extends Component {
  
  render() {
    
        
    return (
      <Router>
      <div className="App">
      
        
        
        
        <a href="/ShowEvents"> Events </a>
    
        
        <Switch>

<Route path="/ShowEvents" component={ShowEvents} />

</Switch>
      </div>
      </Router>
    );
  }
}

export default App;
