import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Assign extends Component {
    state = {
        email: ""
      }


      onChange = (e) =>  this.setState({ [e.target.name]: e.target.value})

      onSubmit = (e) => {
          e.preventDefault();
          this.props.edit(this.state)
          this.setState({ email : "" })
      }

  render() {
    return (
      <div>
       <form>

            <input
                type="text"
                name = "email"
                placeholder = "Write the Member Email you want to assign"
                value = {this.state.email}
                onChange = {this.onChange} 
                style = {{width : "440px"}}
            />

            <button
                onClick = {this.onSubmit}
                >
                Submit
            </button>
      </form>
      </div>
    )
  }
}

Assign.propTypes = {

    edit: PropTypes.func

}

export default Assign