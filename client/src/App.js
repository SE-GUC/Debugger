import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import announcementPage  from './components/announcementPage';
import announcementButton from './components/announcementButton;'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          <Route exact path= '/' render ={props =>(
            <React.Fragment>
              <announcementButton announcementButton={this.state.announcementButton}/>
              <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            </React.Fragment>
          )} />
          <Route path= '/announcementPage' component={announcementPage} />
            
            
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
