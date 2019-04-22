import React, { Component } from "react";
import axios from 'axios'
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'
import {Enum_appStatus} from '../Enums/Enums'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


export class Vote extends Component {
  state = {
    vote: {
      issuerId: this.props.vgsUsrId,
      nomineeId: "",
      voteEndTime: ""
    },
    nominees:[],
    minDate:null,
    maxDate:null,
    activeVoteExists: false,
    voteMsg:false
  };

  componentDidMount(){
    this.getNominees();
    let minday = (new Date().getDate()>9?new Date().getDate():"0"+new Date().getDate()).toString();
    let minmonth = (new Date().getMonth()>9?(new Date().getMonth()+1):"0"+(new Date().getMonth()+1)).toString();
    let minyear = new Date().getFullYear().toString();
    
    let maxday = (new Date().getDate()>9?(new Date().getDate()+3):"0"+(new Date().getDate()+3)).toString();
    let maxmonth = (new Date().getMonth()>9?(new Date().getMonth()+1):"0"+(new Date().getMonth()+1)).toString();
    let maxyear = new Date().getFullYear().toString();

    let _minDate = minyear+'-'+minmonth+'-'+minday;
    let _maxDate = maxyear+'-'+maxmonth+'-'+maxday;

    this.setState({
      minDate : _minDate,
      maxDate :_maxDate
    })
    //console.log(Enum_userType.President.value)
  }

  parseNominees(Nominees) {
    return Nominees.Directors.map(_Nominee => {
      return { label: _Nominee.directorName, value: _Nominee.vgsUserId };
    });
  }

  async getNominees() {
    await axios.get("http://localhost:8000/api/VGS/getDirectors").then(res => {
      this.setState(
        {
          nominees: this.parseNominees(res.data)
        })
    });
  }

  handleVote = event => {
    event.persist();
    var name = event.target.name;
    this.setState(previousState => {
      previousState.vote[name] = event.target.value;
      return previousState;
    });
  };

    CreateVote = async () =>{
      const SubmittedVote = await axios.post('http://localhost:8000/api/raise_vote',this.state.vote)
      if (SubmittedVote.status === 203){
        this.setState({activeVoteExists: true,voteMsg:false})
      }
      if(SubmittedVote.status===200){
        this.setState({
          voteMsg:true
        })
      }
    }

    isAllowedUserType(){
      if((this.props.vgsType === Enum_userType.President.value  ||  this.props.vgsType ===  Enum_userType.Director.value)){
        return true;
      }
      else
        return false;
    }

    checkAuthorization (){
      console.log(this.props.appStatus.toLowerCase() === Enum_appStatus.Accepted.key.toLowerCase())
      if(this.props.usrId !==null && this.props.vgsUsrId !==null &&
         this.isAllowedUserType()&& 
         this.props.appStatus.toLowerCase() === Enum_appStatus.Accepted.key.toLowerCase())
         return true;
      else return false;
    }
  render() {
    return (
      <div>
        <div>user:{this.props.usrId}</div>
        <div>vgs:{this.props.vgsUsrId}</div>
        <div>type:{this.props.vgsType}</div>
        <div>status:{this.props.appStatus}</div>

     {this.checkAuthorization () === true?
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 center-block" align="center">
              <table className="table">
                <thead />
                <tbody>
                  <tr>
                    <td>Nominee ID</td>
                    <td>
                    <select
                        className="form-control"
                        name="nomineeId"
                        onChange={this.handleVote}
                      >
                        <option value="-1">please select</option>
                        {this.state.nominees.map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>Vote End Time</td>
                    <td>
                      <input
                        className="form-control"
                        name="voteEndTime"
                        type="date"
                        min={this.state.minDate}
                        max={this.state.maxDate}
                        onChange={this.handleVote}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button className="btn btn-info" onClick={this.CreateVote}>Create</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-3" />
          </div>
          
          <div className="row">
              <div className="col-md-3"></div>
             
              { this.state.activeVoteExists ?
              <div className="col-md-6 center-block alert alert-warning" align="center">
               <strong>Your voted wasn not created !!</strong> There is already an active vote running  
              </div>
                : null }
              <div className="col-md-3"></div>
          </div>
        </div>
      :<div className="alert alert-danger">
      <strong>Warning !</strong> You are not allowed to view this page !!
</div> }

{this.state.voteMsg === true ? 
        <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
                <div className="alert alert-success" align='center'> 
                    Your vote has been successfully created
                </div>
            </div>
            <div className="col-md-3" />
        </div>:null}
     </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    usrId:state.userId,
    vgsUsrId:state.VGSUserId,
    vgsType:state.userType,
    appStatus:state.appStatus
  }
}
export default connect(mapStateToProps)(Vote);
