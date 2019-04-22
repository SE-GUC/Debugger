import React, { Component } from 'react'

export class VoteDashBoard extends Component {

  componentWillReceiveProps({someProp}) {
    this.setState({...this.state,someProp})
  }

  render() {
    return (
      <div>
           <table className="table">
                <thead />
                <tbody>
                    <tr>
                        <td>Vote for</td>
                        <td>{this.props.nomineeName}</td>
                    </tr>
                    <tr>
                        <td>Vote End Time (m/d/yyyy)</td>
                        <td>{this.props.endAt}</td>
                    </tr>
                  <tr>
                    <td>Decision</td>
                    <td>
                      <input type="radio" name="decision" value="true" onChange={this.props.onChange}/> Yes
                      <hr/>
                      <input type="radio" name="decision" value="false" onChange={this.props.onChange}/> No
                    </td>
                  </tr>
                </tbody>
              </table>
              {this.props.lastDecision ===null?
                <div className="alert alert-info">
                <strong>Info!</strong> You haven't voted yet !! 
               </div>
               :
               <div className="alert alert-warning">
                You voted before and your last decision was <b>{this.props.lastDecision}</b>
             </div>  
            }

      </div>
    )
  }
}

export default VoteDashBoard
