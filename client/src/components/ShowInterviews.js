import React, { Component } from 'react'
import Interviews from './Interviews';
import axios from 'axios'
import {connect} from "react-redux";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


export class ShowInterviews extends Component {
    state = {
        boothMember: false,
        interviews: []
      }

    ifBoothMember = (id) => {
         return axios.get('http://localhost:8000/api/VGS/' + id)
         .then(res => { 
             if (res.data.boothMember=== true)
               this.setState({boothMember: true})
             console.log(this.state.boothMember)
         })
             .catch(function(error) {
              console.log("Failed!", error);
              return false
             })

     }

    componentWillMount = async() => {
       await this.ifBoothMember(this.props.userId)
       axios.get('http://localhost:8000/api/interviews/')
       .then(res => {this.setState({interviews: res.data })
       console.log (this.state)})
       .catch(function(error) {
        console.log("Failed!", error);
      })

    }


    editInterviews =(s) => {
        console.log(s)
        axios.put('http://localhost:8000/api/interviews/edit', 
        {
            interviewerEmail: s.interviewerEmail,
            intervieweeEmail: s.intervieweeEmail,
            day: s.day,
            date: s.date,
            slot: s.interviewslot,
            startTime: s.startTime,
            endTime: s.endTime,
            interview : s.interview
        })     

        .then(res => { this.setState({interviews: res.data })
          alert ("This Interview was updated Successfully")})
        .catch(function(error) {
           alert(error.message);
      })
     }

  render() {

      if (this.props.userId){
       if (this.state.interviews.length > 0){
        return (
        <div className = "container"> 
                <table className = "table">
                    <tbody>
                        <tr>
                            <td> <h5> Interviewer Email </h5></td>
                            <td> <h5> Interviewee Email </h5> </td>
                            <td> <h5> Day </h5> </td>
                            <td> <h5> Date </h5> </td>
                            <td> <h5> Interview Slot </h5> </td>
                            <td> <h5> Start Time </h5> </td>
                            <td> <h5> End Time </h5> </td>
                            <td> <h5> Has Interview? </h5> </td>
                        </tr>
                        </tbody>      
                    </table>           
            <Interviews interview = {this.state.interviews}  boothMember = {this.state.boothMember} 
            editInterviews = {this.editInterviews} />
        </div>
        )
    }

  else{
    return(
        <div className="alert alert-info">
           <strong> Note: </strong> There are no Interviews yet
        </div>
      )
  }
}
    else{
        return(
            <div className="alert alert-danger">
               <strong>Warning !</strong> You are not logged in to view this page
            </div>
          )
    }
  }
}

const mapStateToProps = (state)=>{
    return {
      userId: state.userId,
      userType: state.userType
    }
  }
  
  export default connect(mapStateToProps)(ShowInterviews)