import React, { Component } from "react";
import axios from "axios";
import {Enum_userType} from '../Enums/Enums'
import {Enum_appStatus} from '../Enums/Enums'
import {connect} from "react-redux";


export class ViewAppForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allApps: []
    };

   // this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    this.gettingAppForms();
   }

  getUserTypeValue = (value)=>{
     return Enum_userType.getKey(value)
  }

  getAppStatusValue = (value)=>{
    return Enum_appStatus.getKey(value)
 }

  gettingAppForms = async () => {
    const getApps = await axios.get(
      "http://localhost:8000/api/VGS/application_forms_view"
    );
    if (getApps.status === 200) {
      this.setState({ allApps: getApps.data }, () => console.log(this.state.allApps));
    }
    else if(getApps.status ===203){
      this.setState({ allApps: [] }, () => console.log(this.state.allApps));
    }
  };

  async updateStatus(AppId){
    let currentStatus = document.getElementById(AppId).value
    const data = {
      AppId:AppId,
      appStatus:currentStatus
    }
    const updateDate = await axios.post('http://localhost:8000/api/VGS/update/AppForm',data)
    if(updateDate.status === 200){
      this.gettingAppForms()
    }
  }
  render() {
    return (
      <div>
        {this.props.usrType === (Enum_userType.President.value||Enum_userType.Director.value||Enum_userType.Head.value)?
        <div className="container">
          <div className="row">
          {this.state.allApps.length > 0 ?
            <table className="table">
              <thead />
              <tbody>
                <tr>
                  <td>Applicant Name</td>
                  <td>Club Committee</td>
                  <td>User Type</td>
                  <td>Hobbies</td>
                  <td>VGS Year</td>
                  <td>Game Name</td>
                  <td>Application Status</td>
                  <td>Change Application Status</td>
                </tr>
                {this.state.allApps.map((data, i) => (
                  <tr key={i}>
                    <td>{data.ApplicantName}</td>
                    <td>{data.clubCommittee}</td>
                    <td>{this.getUserTypeValue(data.userType)}</td>
                    <td>{data.hobbies}</td>
                    <td>{data.VGSYear}</td>
                    <td>{data.gameName}</td>
                    <td>{this.getAppStatusValue(data.appStatus)}</td>
                    <td>
                      <select id={data.AppFormId} className="form-control" name="appStatus">
                        <option value='1'>Pending</option>
                        <option value='2'>Accepted</option>
                        <option value='3'>Rejected</option>
                      </select>
                      </td>
                    <td><button className="btn btn-success" onClick={()=>this.updateStatus(data.AppFormId)}>Update</button></td>                    
                  </tr>
                ))}
              </tbody>
            </table>:
            <div className="alert alert-info">
            <strong>Info:</strong> There aren't no pending application forms to view
        </div> }
          </div>
        </div>:
        <div className="alert alert-danger">
            <strong>Warning !</strong> You are not authorized to view this page
        </div> }
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    usrId:state.userId,
    vgsUsrId:state.VGSUserId,
    usrType: state.userType
  }
}
export default connect(mapStateToProps)(ViewAppForms)
