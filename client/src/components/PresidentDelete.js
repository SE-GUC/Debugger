import React, { Component } from 'react'
import axios from 'axios';

export class PresidentDelete extends Component {
    constructor(props){
        super(props);
        this.state ={
          //  userEmail:{

                email: ""
           // }
        }
    }

    handleChange = event => {
        event.persist();
        // var name = event.target.name;
        // this.setState(previousState => {
        //   previousState.userEmail[name] = event.target.value
        //   return previousState;
        // },()=>(console.log(this.state)));
        this.setState({email: event.target.value},()=>(console.log(this.state)))
    }

    handleDelete= async () =>{
        const deleting = await axios.delete('http://localhost:8000/api/VGS/deleteuser/'+this.state.email)
        console.log(deleting.status)
        console.log(deleting.data)
        if(deleting.status === 203){
            alert("you can not delete a president")
        }
        else if (deleting.status === 500){
            alert('invalid email')
        }
        else if (deleting.status === 200){
            alert('user deleted')
        }

    }
  render() {
    return (
      <div>
        <span>Email</span>
        <input name='email' type='text' onChange={this.handleChange}/>
        <button onClick={this.handleDelete}>delete</button>
      </div>
    )
  }
}

export default PresidentDelete
