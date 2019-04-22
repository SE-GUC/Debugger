import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import VoteDashBoard from "./customComponents/VoteDashBoard";
import {Enum_userType} from '../Enums/Enums'
import {Enum_appStatus} from '../Enums/Enums'
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
      TotalAgainstVotes: 0,
      submitMsg: false
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
      let lastVote;
      if(voteInfo.data.lastVote !== null){
        lastVote = voteInfo.data.lastVote === true ? "Yes" : "No"
      }
      else{
        lastVote =null
      }
      this.setState(
        {
          noActiveVote: false,
          nomineeName: voteInfo.data.nominee,
          voteId: voteInfo.data.voteId,
          voteEndTime: voteInfo.data.endTime,
          lastVoteDecision: lastVote
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

    const perecntageFor = ((totalFor/(totalFor+totalAgainst))*100).toFixed(2)
    const perecntageAgainst = ((totalAgainst/(totalFor+totalAgainst))*100).toFixed(2)
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
        lastVoteDecision: lastVote,
        submitMsg: true
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

  isAllowedUserType(){
    if((this.props.vgsType === Enum_userType.President.value  ||  this.props.vgsType ===  Enum_userType.Director.value)){
      return true;
    }
    else
      return false;
  }

  checkAuthorization (){
    if(this.props.usrId !==null && this.props.vgsUsrId !==null &&
        this.isAllowedUserType()&& 
       this.props.appStatus.toLowerCase() === Enum_appStatus.Accepted.key.toLowerCase())
       return true;
    else return false;
  }
  render() {
    return (
      <div>
      {this.checkAuthorization() === true?
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
          
            {this.state.noActiveVote === false ? 
            <div className="col-md-6">
              <h1 align="center">Vote Results</h1>
               <hr/>
              <b style={yesStyle}>Yes:</b>
              <div style={{backgroundColor:'#359AE8',width:this.state.TotalForVotes+'%', color:'white', textAlign:'center'}}> {this.state.TotalForVotes} %</div>
              <b style={noStyle}>No:</b>
              <div style={{backgroundColor:'#359AE8',width:this.state.TotalAgainstVotes+'%', color:'white', textAlign:'center'}}> {this.state.TotalAgainstVotes} %</div>
            </div>
              : null}
         
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
          </div>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 center-block" align="center">
              {this.state.noActiveVote ? <div className="alert alert-warning" align='center'>There is no active vote</div> : null}
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      :<div className="alert alert-danger">
      <strong>Warning !</strong> You are not allowed to view this page !!
        </div> }
        {this.state.submitMsg === true ? 
        <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
                <div className="alert alert-success" align='center'> 
                    Your vote has been successfully submitted
                </div>
            </div>
            <div className="col-md-3" />
        </div>:null}
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
    vgsUsrId: state.VGSUserId,
    vgsType:state.userType,
    appStatus:state.appStatus
  };
};
export default connect(mapStateToProps)(SubmitVote);
