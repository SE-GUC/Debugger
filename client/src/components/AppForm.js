import React, { Component } from "react";
import axios from "axios";
import {connect} from "react-redux";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export class AppForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: {
        userId: "5ca907226acc0810b46d84dc",
        userType: -1,
        clubCommittee: "",
        hobbies: "",
        VGSYear: null,
        appliedPosition: "",
        gameName: ""
      },
      allUserTypes: []
    };
    this.handleApplicant = this.handleApplicant.bind(this);
    this.handleSubmitd = this.handleSubmit.bind(this);
    this.logApplicant = this.logApplicant.bind(this);
    this.getAllLookups = this.getAllLookups.bind(this);
    this.handleRedux = this.handleRedux.bind(this);
  }

  parseUserTypes(userTypes) {
    return userTypes.map(_userType => {
      return { label: _userType.UserType, value: _userType.UserTypeCode };
    });
  }

  componentDidMount() {
    this.getAllLookups();
  }

  handleRedux(){
    console.log(this.props.usrId)
    console.log(this.props.vgsUsrId)
  }

  async getAllLookups() {
    await axios.get("http://localhost:8000/api/lookups/Usertypes").then(res => {
      this.setState(
        {
          allUserTypes: this.parseUserTypes(res.data)
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }

  handleApplicant(event) {
    event.persist();
    var name = event.target.name;
    // var applicantState= this.state.applicant;
    // applicantState[name]= event.target.value;
    this.setState(previousState => {
      previousState.applicant[name] = event.target.value;
      return previousState;
    });
  }

  handleSubmit = async () => {
    console.log(this.state.applicant)
    const SubmittedApp = await axios.post(
      "http://localhost:8000/api/VGS/application_form",
      this.state.applicant
    );
    console.log(SubmittedApp);
    //<div className="alert alert-success">Submitted</div>
  };

  logApplicant() {
    console.log(this.state.applicant);
  }
  render() {
    return (
      <div>
         <div>USERID : {this.props.usrId}</div>
        <div>VGSUSERID: {this.props.vgsUsrId}</div>
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
                      <select
                        className="form-control"
                        name="userType"
                        onChange={this.handleApplicant}
                      >
                        <option value="-1">please select</option>
                        {this.state.allUserTypes.map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>Committee</td>
                    <td>
                      <input
                        className="form-control"
                        name="clubCommittee"
                        type="text"
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
                        onChange={this.handleApplicant}
                      />
                    </td>
                  </tr>
      
                  <tr>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.handleRedux}>
                        show redux
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    usrId:state.userId,
    vgsUsrId:state.VGSUserId
  }
}
export default connect(mapStateToProps)(AppForm)
// export default AppForm;

