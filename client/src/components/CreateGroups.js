import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export class CreateGroups extends Component {

    state = {
        name: "",
        members: ""
      }

      onChange = (e) => { this.setState({ [e.target.name]: e.target.value})}


      onSubmit = (e) => {

          e.preventDefault();
          this.props.createGroups(this.state)
          this.setState({name: "",
                members: ""
        })
      }  

  render() {

    return (
        <div> 
      <form>
      <br/>
        <h6>Create New Group </h6>
        <input
            type = "text" 
            name = "name"
            placeholder = "Group Name"
            value = {this.state.name}
            onChange = {this.onChange}
            />

            <input
            typeof = "array"
            name = "members"
            placeholder = "insert one Member Email (if you want to add members you can add after creating)"
            value = {this.state.members}
            onChange = {this.onChange}
            style = {{width : "650px"}}
            />

           <button
            onClick = {this.onSubmit}
            >
            Create
            </button>
           
      </form>
      <br />
      </div> 
    )
  }
}

CreateGroups.propTypes = {

  createGroups: PropTypes.func.isRequired

}

export default CreateGroups;