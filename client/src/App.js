import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import react_view_faq from './components/react_view_faq';
import axios from 'axios'

import './App.css';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const id = '5c966e60569bd218bcdb2ec0'
class App extends Component {
  
  state = {
    faq: []
  }

  
 
  viewfaq= (id) => {

   axios.get('http://localhost:3001/api/faq/getFaqs' + id)
   .then(res => this.setState({faq: res.data }))
   .catch(function(error) {
    console.log("Failed!", error);
  })
  
}

  render() {
    return (
      <Router>
       <div className="App">
        <p>Welcome</p>
        <p>
          <button onClick={() => this.viewfaq(id)}>FAQ </button>
        </p>
        <react_view_faq react_view_faq = {this.state.faq}/>
       </div>
      </Router>
    );
  }
}

export default App;