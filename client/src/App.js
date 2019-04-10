import React, { Component } from 'react';
import Users from './components/Users';


import './App.css';

class App extends Component {
  state = {
    users : [{
      id: 1,
      title: 'user 1',
      completed: false

    },
    {
      id: 2,
      title: 'user 2',
      completed: true

    },
    {
      id: 3,
      title: 'user 3',
      completed: false

    },

    ]
  }
  render() {
    
    return (
      <div className="App">
        <Users users = {this.state.users}/>
      </div>
    );
  }
}

export default App;
