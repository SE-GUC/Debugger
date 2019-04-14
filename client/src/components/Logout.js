import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Redirect,Route } from "react-router-dom";
import { connect } from "react-redux";

export class Logout extends Component {
  constructor(props) {
    super(props);

    this.Logout = this.Logout.bind(this);
  }

  Logout = async () => {
    this.props.onLogout();
    window.location.replace("http://localhost:3000/Login");
  };

  render() {
    return (
      <div>
        {/* <div>USERID : {this.props.usrId}</div>
        <div>VGS ID :{this.props.vgsUsrId}</div> */}
        <button type="button"  className="btn btn-sm btn-danger" onClick={this.Logout}>
          Sign Out
        </button>
      </div>
    );
  }
}

// export default Login;
const mapStateToProps = state => {
  return {
    usrId: state.userId,
    vgsUsrId: state.VGSUserId,
    usrType: state.userType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Logout);
