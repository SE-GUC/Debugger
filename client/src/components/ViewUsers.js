import React, { Component } from 'react'
import ViewUserItem from './ViewUserItem'

class ViewUsers extends Component {
  render() {
    return this.props.Users.map((User) => (
        <ViewUserItem key = {User['_id']} User = {User} delUser = {this.props.delUser} />
    ));
  } 
}

export default ViewUsers
