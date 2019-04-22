import React, { Component } from 'react'
import Assign from './Assign';
import axios from 'axios'
import {Enum_userType} from '../Enums/Enums'
import {connect} from "react-redux";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


export class AssignBoothMembers extends Component {
    state = {
        position: false
      }

    ifHRHead = (id) => {
         return axios.get('http://localhost:8000/api/VGS/' + id)
         .then(res => { 
           console.log(res.data.appliedPosition)
             if (res.data.appliedPosition=== "HR Head")
               this.setState({position: true})
             console.log(this.state.position)
         })
             .catch(function(error) {
              console.log("Failed!", error);
              return false
             })

     }

    componentWillMount = async() => {

       await this.ifHRHead(this.props.userId)

    }


    edit =(s) => {
        console.log(s)
        axios.put('http://localhost:8000/api/VGS/assign', 
        {
            email: s.email
        })     

        .then(res =>  alert ("Booth Member was assigned Successfully"))
        .catch(function(error) {
           alert(error.message);
      })
     }

  render() {

      if (this.props.userId){
       if (this.state.position && (this.props.userType === Enum_userType.Head.value)){

        return (
        <div className = "container"> 
          <br/>
          <br/>
            <Assign edit = {this.edit} />
        </div>
        )
    }

  else{
    return (
         <div className="alert alert-danger">
            <strong>Warning !</strong> You are not Authorized to view this page since you are not an HR Head
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
  
  export default connect(mapStateToProps)(AssignBoothMembers)