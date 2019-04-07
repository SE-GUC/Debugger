import React, { Component } from 'react';
import PropTypes from 'prop-types';



export class UserItem extends Component {
    getStyle = () => {
        return{
            background: '#f09',
            padding: '15px',
            borderBottom: '3px #ccc dotted',
            textDecoration: this.props.user.completed?
            'line-through': 'none'

        }
    }
    markComplete =(e)=>   {
        console.log(this.props)
    }
  render() {
    return (
      <div style={this.getStyle()}>
        <p>
        
        {this.props.user.title}
        {'                         '} <input type="button" onClick= {this.markComplete}/>
        
        
        </p>
      </div>
    )
  }
}
UserItem.propTypes={
    user: PropTypes.object.isRequired
  }
export default UserItem
