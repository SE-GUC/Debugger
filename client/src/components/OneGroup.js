import React, { Component } from 'react'
import PropTypes from 'prop-types';
import EditGroups from "./EditGroups"

export class OneGroup extends Component {

  render() {
    return (
        <div>
          <div>
          <table className = "table">
          <tbody>
              <tr>
                  <td> {this.props.group.name+ " "} </td>
                  <td> {this.props.group.members + " "}  </td>
              </tr>
              </tbody>
          </table> 
        </div>
          <EditGroups groups = {this.props.group} editGroups = {this.props.editGroups} />
        <br />
        <br />
        <br />
        <br />
        </div>
    )
  }
}

OneGroup.propTypes = {

    group: PropTypes.object.isRequired,
    editGroups: PropTypes.func.isRequired

}

export default OneGroup