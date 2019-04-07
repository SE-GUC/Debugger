import React, { Component } from 'react';

 class Awg extends Component {
  

  render() {
    
   return this.props.clubs.map((club)=>(
      <h3>{club} </h3>
      
      ))


  }
}
 
export default Awg;