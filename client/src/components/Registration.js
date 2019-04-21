import React, { Component } from "react";
import CheckBox from "./customComponents/CheckBox";
import axios from "axios";
import {connect} from "react-redux";

export class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserData: {
        name: "",
        birthDay: "",
        email: "",
        password: "",
        studyYear: -1,
        generalAddress: "",
        PhoneNumber: "",
        modeOfTran: -1,
        clubName: []
      },
      shit: [],
      studyYearCodes: [],
      transportationCodes: [],
      clubCodes: [],
      registerMsg: false,
      validationMsg: false
    };
    //this.Register = this.Register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    //this.show = this.show.bind(this);
  }

  parseStudyYears(studyYears) {
    return studyYears.map(_studyYears => {
      return { label: _studyYears.StudyYear, value: _studyYears.StudyYearCode };
    });
  }
  parseTransportation(transportations) {
    return transportations.map(_transportations => {
      return {
        label: _transportations.TransportationName,
        value: _transportations.TransportationCode
      };
    });
  }
  parseClubs(clubs) {
    return clubs.map(_clubs => {
      return { label: _clubs.club, value: _clubs.clubCode };
    });
  }

  componentDidMount() {
    this.getAllLookups();
  }

  async getAllLookups() {
    const studyYears = await axios.get(
      "http://localhost:8000/api/lookups/StudyYear"
    );
    const transportations = await axios.get(
      "http://localhost:8000/api/lookups/Transportation"
    );
    const clubs = await axios.get("http://localhost:8000/api/lookups/Clubs");
    this.setState(
      {
        studyYearCodes: this.parseStudyYears(studyYears.data),
        transportationCodes: this.parseTransportation(transportations.data),
        clubCodes: this.parseClubs(clubs.data)
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  handleChange(event) {
    event.persist();
    var name = event.target.name;
    // var applicantState= this.state.applicant;
    // applicantState[name]= event.target.value;
    this.setState(previousState => {
      previousState.UserData[name] = event.target.value;
      return previousState;
    });
  }

  // show() {
  //   console.log(this.state.UserData);
  // }

  handleCheckBox(event) {
    const value = parseInt(event.target.value);
    let clubs = this.state.UserData.clubName;
    const indexOfCurrentValue = clubs.indexOf(value);

    if (indexOfCurrentValue !== -1) {
      let updatedClubs = clubs.filter(x => x !== value);

      this.setState(previousState => {
        previousState.UserData.clubName = updatedClubs;
      });
    } else {
      let newclubs = [...this.state.UserData.clubName, value];

      this.setState(previousState => {
        previousState.UserData.clubName = newclubs;
      });
    }
  }

  Register = async () => {
    if(this.state.UserData.name === "" || 
       this.state.UserData.birthDay === "" || 
       this.state.UserData.email.length < 3 || 
       this.state.UserData.password <6 || 
       this.state.UserData.studyYear === -1 || 
       this.state.UserData.generalAddress === "" || 
       this.state.UserData.PhoneNumber === "" || this.state.UserData.modeOfTran === -1){
         this.setState({validationMsg: true});
         return;
       }
    const registerUser = await axios.post(
      "http://localhost:8000/api/profile/register",
      this.state.UserData
    );
    if(registerUser.status === 200){
      this.setState({registerMsg: true})
    }
    console.log(registerUser.data);
  };

  render() {
    return (
      <div>
        {this.props.usrId ===null?
        <div className="container">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8 center-block" align="center">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      Email<span style={divStyle}>*</span>
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="email"
                        onChange={this.handleChange}
                      />
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, enter your email </td>:null}
                  </tr>

                  <tr>
                    <td>
                      Password<span style={divStyle}>*</span>
                    </td>
                    <td>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder='minimum 6 characters'
                        onChange={this.handleChange}
                      />
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> password must be 6 characters or more </td>:null}
                  </tr>

                  <tr>
                    <td>
                      birthday<span style={divStyle}>*</span>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        name="birthDay"
                        onChange={this.handleChange}
                      />
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, enter your DOB </td>:null}
                  </tr>

                  <tr>
                    <td>Name <span style={divStyle}>*</span></td>
                    <td>
                      <input
                        className="form-control"
                        name="name"
                        onChange={this.handleChange}
                      />
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, enter your name </td>:null}
                  </tr>

                  <tr>
                    <td>Study Year<span style={divStyle}>*</span></td>
                    <td>
                      <select
                        className="form-control"
                        name="studyYear"
                        onChange={this.handleChange}
                      >
                        <option value="-1">please select</option>
                        {this.state.studyYearCodes.map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, select you study year </td>:null}
                  </tr>

                  <tr>
                    <td>General Address<span style={divStyle}>*</span></td>
                    <td>
                      <input
                        className="form-control"
                        name="generalAddress"
                        onChange={this.handleChange}
                      />
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, enter your Address </td>:null}
                  </tr>

                  <tr>
                    <td>Phone Number <span style={divStyle}>*</span></td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        name="PhoneNumber"
                        onChange={this.handleChange}
                      />
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, enter you phone number </td>:null}
                  </tr>

                  <tr>
                    <td>Mode of Transportation<span style={divStyle}>*</span></td>
                    <td>
                      <select
                        className="form-control"
                        name="modeOfTran"
                        onChange={this.handleChange}
                      >
                        <option value="-1">please select</option>
                        {this.state.transportationCodes.map((type, i) => (
                          <option key={i} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    {this.state.validationMsg === true?
                    <td style={divStyle}> Please, select a Mode of Transportation </td>:null}
                  </tr>

                  <tr>
                    <td>Club Name</td>

                    <td>
                      {this.state.clubCodes.map((club, i) => (
                        <CheckBox
                          style={style}
                          key={i}
                          value={club.value}
                          text={club.label}
                          onChange={this.handleCheckBox}
                        />
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.Register}
                      >
                        Register
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.show}
                      >
                        show
                      </button> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-2" />
          </div>

          {this.state.registerMsg === true ?
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 center-block" align="center">
                <div className="alert alert-success" align='center'>
                    You have registered successfully.
                </div>
            </div>
            <div className="col-md-3"/>
          </div>:null}
        </div>
           :<div className="alert alert-danger">
                <strong>Warning !</strong> You are not allowed to view this page !!
      </div> }
     </div>
    );
  }
}
const divStyle = {
  color: "red",
  marginLeft: "3%"
};
const style = {
  display: "inline"
};

const mapStateToProps = (state)=>{
  return {
    usrId:state.userId,
    vgsUsrId:state.VGSUserId,
    usrType: state.userType,
    appStatus: state.appStatus
  }
}

export default connect(mapStateToProps)(Registration);
