import React, { Component } from 'react'

class ViewUserItem extends Component {
    render() {
    const name = this.props.User.name
    const email = this.props.User.email
    return (
      <div>
          <p>
              {name}
              {email}
              <button onClick = {this.props.delUser.bind(this, this.props.User['_id'])} style = {btnst}>deleteUser</button>
          </p>
      </div>
    )
  }
}

const btnst = {
    color: '#ffffff',
    borderRadius: '20%'
}

export default ViewUserItem
