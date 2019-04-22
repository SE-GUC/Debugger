import React, { Component } from 'react'
import Groups from './Groups';
import CreateGroups from './CreateGroups';
import EditGroups from './EditGroups'
import axios from 'axios'
import {connect} from "react-redux";
import {Enum_userType} from '../Enums/Enums'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export class ShowGroups extends Component {

    state = {
      email: '',
      groups: [] 
  }

  getUserEmail = (id) => {

    return axios.get('http://localhost:8000/api/profile/' + id)
     .then(res =>  {
       this.setState({email: res.data.data.email})
     })
       .catch(function(error) {
          console.log("Failed!", error);
         }) 

 }

  componentDidMount = async() => {
       console.log(this.props)
       await this.getUserEmail(this.props.userId)
       console.log(this.state)
       axios.get('http://localhost:8000/api/groups/' + this.state.email)
       .then(res => {this.setState({groups: res.data })
       console.log(this.state)
       })

       .catch(function(error) {
        console.log("Failed!", error);
      })
  }

  getUserType = (v)=>{
    return Enum_userType.getKey(v)
 }


    createGroups = (s) => {
        
        console.log(s)
        axios.post('http://localhost:8000/api/groups', 
        {
            name: s.name,
            createdBy: this.state.email,
            members: [s.members]
        })     

        .then(res => { console.log(res.data)
              alert("Your Group was Successfully created")})

        .catch(function(error) {
           alert(error.message);

      })
    }

     editGroups =(s) => {

        console.log(s)
        axios.put('http://localhost:8000/api/groups/', 
        {
            name: s.name,
            members: [s.members]
        })     

        .then(res => { this.setState({groups: res.data.data})
             alert("Your Group was Successfully updated")})

        .catch(function(error) {
           alert(error.message);
      })
     }

  render() {

  if (this.props.userId){ 
   if ((this.props.userType === Enum_userType.Head.value)||(this.props.userType === Enum_userType.President.value)
   ||(this.props.userType === Enum_userType.Director.value)){
     if (this.state.groups.length > 0){

      return (
        <div>
          <CreateGroups createGroups = {this.createGroups}/>
          <table className = "table">
        <tbody>
            <tr>
                <td> <h5> Group Name </h5> </td>
                <td> <h5> Members Emails </h5> </td>  
            </tr>
            </tbody>      
        </table> 
        <Groups groups = {this.state.groups} editGroups = {this.editGroups}/>
       </div>
      )
     }

     else {
      return(
        <div className = "container">

          <div className="alert alert-info">
            <strong> Note: </strong> You don't any Groups yet
          </div>

          <div>
            <CreateGroups createGroups = {this.createGroups}/>
          </div>

        </div>
      )
     }
    }

    else {
      return(
        <div className="alert alert-danger">
           <strong>Warning !</strong> You are not authorized to view this page since you are not a 
           Head, Director or President
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

export default connect(mapStateToProps)(ShowGroups)
