import React, { Component } from 'react';
import{BrowserRouter as Router, Route} from 'react-router-dom'
import Awg from './components/Awg' 
import About from './components/pages/About'

import More from './components/More'

import './App.css';


class App extends Component {
  state={
    clubs:[
        <div>
          <p> Welcome to Awg</p>
        </div>
    ]
  }
 
  render() {
    return (
      <Router>
      <div className="App"></div>
      <Route exact path='/' render={props =>(
         <React.Fragment>
         <Awg  clubs={this.state.clubs}/>
         <More/>
         
         </React.Fragment>
        
         
      )}/>
    <Route path='/about' component={About}/> 
      
      </Router>
    );
  }
}

export default App;
