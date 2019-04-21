import React, { Component } from 'react'
import ViewUsers from './ViewUsers'
import axios from 'axios'
import { userInfo } from 'os';

class ViewAllUsersAndDelete extends Component {
  constructor(props){
      super(props);
      this.state = {
          allUser: [],
          Loading: false,
          error: null
      }
  }

async componentDidMount(){
      this.setState({Loading:true})
      try{
          console.log("getting users")
          const UserQuery = await axios.get("http://localhost:8000/api/profile"); 
          const allUsers = UserQuery.data.data
          console.log("got users")
          this.setState({allUser: allUsers, Loading:false})
      }
      catch(error){
          this.setState({error, Loading:false})
      }
  }

 delUser = async (id) => {
      const deleted = await axios.delete(`http://localhost:8000/api/profile/${id}`)
      console.log("user deleted")
      this.setState({allUser: [...this.state.allUser.filter(User => User['_id'] !== id)]})
  }
    render() {
        const {allUser, Loading, error} = this.state;
        if(error){
            return <h3>{error.message}</h3>
        }
        if(Loading){
            return <h3>Page Is Loading...</h3>
        }
        return (
        <div>
            <ViewUsers Users = {allUser} delUser = {this.delUser} />
        </div>
    )
  }
}

export default ViewAllUsersAndDelete
