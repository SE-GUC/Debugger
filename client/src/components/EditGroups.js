import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EditGroups extends Component {

    state = {
        name: "",
        members: ""
      }

      onChange = (e) => {
        this.setState ({name: this.props.groups.name})
        this.setState({ [e.target.name]: e.target.value})
      }


      onSubmit = (e) => {

          e.preventDefault();
          this.props.editGroups(this.state)
          this.setState({name: "", members: ""})
      }

  render() {

    return (
      <div>
       <form>
        
            <input
            type="text"
            name = "members"
            placeholder = "Add a new Member"
            value = {this.state.members}
            onChange = {this.onChange}  
            />

           <button
            onClick = {this.onSubmit}
            >
            Submit changes
            </button>

      </form>
      </div>
    )
  }
}

EditGroups.propTypes = {

  groups: PropTypes.object.isRequired,
  editGroups: PropTypes.func.isRequired

}

export default EditGroups