import React, { Component } from 'react'
import axios from 'axios';

export class HeadDelete extends Component {
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
       const method={email:this.state.email}  
      const deleting = await axios.put('http://localhost:8000/api/VGS/deletefromcommity',method)
        console.log('done')
        if (deleting.status === 200){
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

export default HeadDelete
