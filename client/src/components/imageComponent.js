import React, { Component } from 'react'
import cont from '../images/cont.gif'


export class imageComponent extends Component {
  render() {
    return (
      <div>
        <div className="container"/>
          <div className="row"/>
          <div className="col-md-12" align='center'>
          <img src={cont} alt='' style={{width:"98.5%" , height:"700px"}} />
          </div>
      </div>
    )
  }
}

export default imageComponent
