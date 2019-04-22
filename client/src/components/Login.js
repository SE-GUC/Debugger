import React, { Component } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Redirect,Route } from "react-router-dom";
// import Vote from "./Vote";
import {connect} from "react-redux";


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: "",
        password: ""
      },
      userId: "",
      VGSUserId: "",
      invalidCredentials: false,
      invalidCredMsg: "Wrong email or password"
    };
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  Login = async () => {
    let userData;
    if(this.state.credentials.email.trim() !== ''||this.state.credentials.password.trim() !== '')
    {
      let status=null;
      userData = await axios.post("http://localhost:8000/api/profile/login",
      this.state.credentials);
      //console.log(userData.data.vgsUsedId)
      if(userData.data.userId){
        if(userData.data.vgsUsedId){
          const result = await axios.get("http://localhost:8000/api/VGS/status/application_form_view/"+userData.data.vgsUsedId)
          status = result.data.appStatus
        }
        this.handleAfterSuccessfulLogin(userData.data.userId, userData.data.vgsUsedId, userData.data.userType,status)
      }
      else  if(userData.status === 203){
        this.setState({invalidCredentials: true})
      }


    console.log(userData.data);
    }
    else{
      alert('Please enter your user name and password');
    }
  };

  handleChange(event) {
    event.persist();
    var name = event.target.name;
    // var applicantState= this.state.applicant;
    // applicantState[name]= event.target.value;
    this.setState(previousState => {
      previousState.credentials[name] = event.target.value;
      previousState.invalidCredentials=false;
      return previousState;
    });
  }

  handleAfterSuccessfulLogin(_userId,_vgsUserId,_userType,_appStatus){
    // this.setState({
    //   userId: _userId,
    //   VGSUserId: _vgsUserId
    // },()=>{console.log(this.state.userId+ ' '+this.state.VGSUserId)})
    // return <Route  to="/Vote" component={Vote}/>;
    this.props.onLogin(_userId,_vgsUserId,_userType,_appStatus)
    window.location.replace("/");
  }

  render() {
    return (
      <div>
        {/* <div>USERID : {this.props.usrId}</div>
        <div>VGS ID :{this.props.vgsUsrId}</div> */}
        {/* <div>USER TYPE :{this.props.usrType} ===== {this.props.appStatus}</div> */}
        <div></div>
        {this.props.usrId ===null?
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 center-block" align="center">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Email<span style={divStyle}>*</span></td>
                    <td>
                      <input
                        className="form-control"
                        name="email"
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Password<span style={divStyle}>*</span></td>
                    <td>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.Login}
                      >
                        Login
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-3" />
          </div>
     </div>:
        <div className="alert alert-danger">
          <strong>Warning !</strong> You are already logged in !!
        </div> }

    {this.state.invalidCredentials===true?
        <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="alert alert-warning" align="center">{this.state.invalidCredMsg}</div>
        </div>
        <div className="col-md-3" />
        </div>
        :null}
      </div>
    );
  }
}

const divStyle = {
  color:"red",
  marginLeft:'3%'
};

// export default Login;
const mapStateToProps = (state)=>{
  return {
    usrId:state.userId,
    vgsUsrId:state.VGSUserId,
    usrType: state.userType,
    appStatus: state.appStatus
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onLogin:(_usrId,_vgsId,_usrType,_appStatus)=>dispatch({type:"ADDCRED", urId:_usrId, vgsId:_vgsId, vgsType: _usrType, appStatus:_appStatus})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)