import React, { Component } from "react";
import axios from "axios";
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'

export class AppFormEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: {
        userType: -1,
        clubCommittee: "",
        hobbies: "",
        VGSYear: 0,
        appliedPosition: "",
        gameName: ""
      },
      updateMsg: false
    };
  }

  async componentDidMount(){
    const applicantData = await axios.get('http://localhost:8000/api/VGS/returnApplicant/'+this.props.vgsUsrId)
    console.log(applicantData.data)
    let data = {
        userType: applicantData.data.userType,
        clubCommittee: applicantData.data.clubCommittee,
        hobbies: applicantData.data.hobbies,
        VGSYear: applicantData.data.VGSYear,
        appliedPosition: applicantData.data.appliedPosition,
        gameName: applicantData.data.gameName
    }
    this.setState({applicant: data},()=>{console.log(this.state)})
  }

  getEnumKey(){
      return Enum_userType.getKey(this.state.applicant.userType)
  }

  editAppForm = async () =>{
      let update = await axios.put('http://localhost:8000/api/VGS/application_form_update/'+this.props.vgsUsrId,this.state.applicant)
      if(update.status === 200){
          this.setState({updateMsg : true})
      }
  }

  handleApplicant= (event) => {
    event.persist();
    var name = event.target.name;
    // var applicantState= this.state.applicant;
    // applicantState[name]= event.target.value;
    this.setState(previousState => {
      previousState.applicant[name] = event.target.value;
      return previousState;
    });
  }

  render() {
    return (
      <div>
        {this.props.usrId !== null ? (
          <div className="container">
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-6 center-block" align="center">
                <table className="table">
                  <thead />
                  <tbody>
                    <tr>
                      <td>User Type</td>
                      <td>
                        <label>{this.getEnumKey()}</label>
                      </td>
                    </tr>

                    <tr>
                      <td>Committee</td>
                      <td>
                        <input
                          className="form-control"
                          name="clubCommittee"
                          type="text"
                          value={this.state.applicant.clubCommittee}
                          onChange={this.handleApplicant}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Hobbies</td>
                      <td>
                        <input
                          className="form-control"
                          name="hobbies"
                          type="text"
                          value={this.state.applicant.hobbies}
                          onChange={this.handleApplicant}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>VGS Year</td>
                      <td>
                        <input
                          className="form-control"
                          name="VGSYear"
                          type="number"
                          value={this.state.applicant.VGSYear}
                          onChange={this.handleApplicant}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Applied Position</td>
                      <td>
                        <input
                          className="form-control"
                          name="appliedPosition"
                          type="text"
                          value={this.state.applicant.appliedPosition}
                          onChange={this.handleApplicant}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Game Name</td>
                      <td>
                        <input
                          className="form-control"
                          name="gameName"
                          type="text"
                          value={this.state.applicant.gameName}
                          onChange={this.handleApplicant}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={this.editAppForm}
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3" />
            </div>
          </div>
        ) : (
          <div className="alert alert-danger">
            <strong>Warning !</strong> You are not allowed to view this page !!
          </div>
        )}
        {this.state.updateMsg === true ? 
        <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
                <div className="alert alert-success" align='center'> 
                    Your Info has been successfully updated
                </div>
            </div>
            <div className="col-md-3" />
        </div>:null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usrId: state.userId,
    vgsUsrId: state.VGSUserId
  };
};

export default connect(mapStateToProps)(AppFormEdit);
