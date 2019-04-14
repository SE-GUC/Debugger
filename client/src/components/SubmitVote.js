import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import VoteDashBoard from "./customComponents/VoteDashBoard";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export class SubmitVote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voteDecision: {
        voterID: this.props.vgsUsrId,
        decision: null
      },
      nomineeName: "",
      voteEndTime: null,
      voteId: "",
      lastVoteDecision: null,
      noActiveVote: null,
      TotalForVotes: 0,
      TotalAgainstVotes: 0
    };

  }

  componentDidMount() {
    this.getVoteData();
  }

  getVoteData = async () => {
    const voteInfo = await axios.get(
      "http://localhost:8000/api/raise_vote/votes/ActiveVote/" +
        this.props.vgsUsrId
    );
    if (voteInfo.status === 203) {
      this.setState({ noActiveVote: true });
    } else {
      this.getVoteStatistics(voteInfo.data.voteId);
      this.setState(
        {
          noActiveVote: false,
          nomineeName: voteInfo.data.nominee,
          voteId: voteInfo.data.voteId,
          voteEndTime: voteInfo.data.endTime,
          lastVoteDecision: voteInfo.data.lastVote === true ? "Yes" : "No"
        },
        () => console.log(this.state)
      );
    }
  };

  getVoteStatistics = async id => {
    const voteStatistics = await axios.get(
      "http://localhost:8000/api/raise_vote/" + id
    );
    
    const totalFor = voteStatistics.data.For
    const totalAgainst = voteStatistics.data.Against

    const perecntageFor = (totalFor/(totalFor+totalAgainst))*100
    const perecntageAgainst = (totalAgainst/(totalFor+totalAgainst))*100
    this.setState({
      TotalForVotes: perecntageFor,
      TotalAgainstVotes: perecntageAgainst
    });
  };

  submmittingVote = async () => {

     const v = await axios.post(
      "http://localhost:8000/api/raise_vote/" + this.state.voteId,
      this.state.voteDecision
    );

    if (v.status === 200) {
    const lastVote = document.querySelectorAll('input')[0].checked===true ? "Yes" : "No";
      this.setState({
        lastVoteDecision: lastVote
      });
      this.getVoteStatistics(this.state.voteId);
    }
  };

  handleChange = event => {
    event.persist();
    var name = event.target.name;
    this.setState(previousState => {
      previousState.voteDecision[name] =
        event.target.value === "true" ? true : false;
      return previousState;
    });
  };
  render() {
    return (
      <div>
      {this.props.usrId !==null?
        <div className="container">
          <div className="row">
            <div className="col-md-6 center-block" align="center">
              {this.state.noActiveVote === false ? (
                <VoteDashBoard
                  nomineeName={this.state.nomineeName}
                  endAt={this.state.voteEndTime}
                  lastDecision={this.state.lastVoteDecision}
                  onChange={this.handleChange}
                />
              ) : null}
            </div>
            <div className="col-md-6">
              <b style={yesStyle}>Yes:</b>
              <div style={{backgroundColor:'#359AE8',width:this.state.TotalForVotes+'%', color:'white', textAlign:'center'}}> {this.state.TotalForVotes} %</div>
              <b style={noStyle}>No:</b>
              <div style={{backgroundColor:'#359AE8',width:this.state.TotalAgainstVotes+'%', color:'white', textAlign:'center'}}> {this.state.TotalAgainstVotes} %</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 center-block" align="center">
              {this.state.noActiveVote === false ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.submmittingVote}
                >
                  Vote
                </button>
              ) : null}
            </div>
            <div className="col-md-3" />
          </div>{" "}
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 center-block" align="center">
              {this.state.noActiveVote ? <p>There is no active vote</p> : null}
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      :<div className="alert alert-danger">
      <strong>Warning !</strong> You are not allowed to view this page !!
        </div> }
     </div>
    );
  }
}
const yesStyle = {
  color: "Green"
};
const noStyle = {
  color: "Red"
};

const mapStateToProps = state => {
  return {
    usrId:state.userId,
    vgsUsrId: state.VGSUserId
  };
};
export default connect(mapStateToProps)(SubmitVote);
