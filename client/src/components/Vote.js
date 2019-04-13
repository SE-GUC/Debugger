import React, { Component } from "react";
//import axios from 'axios'


export class Vote extends Component {
  state = {
      vote:{
          issuerID: "",
          nomineeID: "",
          voteEndTime: ""
      }
  }

  handleVote= (event) =>{
    event.persist();
    var name = event.target.name;
    this.setState(previousState => {
        previousState.vote[name] = event.target.value;
        return previousState;
      });
    console.log(this.state.vote);
  }

//   CreateVote = async () =>{
//     const SubmittedVote = await axios.post('http://localhost:8000/api/raise_vote',this.state.vote)
//     console.log(SubmittedVote)
//   }
  render() {
    return (
      <div>
        <label>Your ID</label>
        <input name="issuerID" type="text" onChange={this.handleVote}/>
        <br/>
        <label>Nominee ID</label>
        <input name="nomineeID" type="text" onChange={this.handleVote}/>
        <br/>
        <label>Vote End Time</label>
        <input name="voteEndTime" type="date" onChange={this.handleVote}/>
        <br/>
        <button onClick={this.CreateVoteVote}>Create</button>
      </div>
    )
  }
}

export default Vote
