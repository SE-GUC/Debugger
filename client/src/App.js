import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Profile from './pages/profile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/profile" component={Profile}/>
        </Router>
      </div>
    );
  }
}

export default App;
