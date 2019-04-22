import React, { Component } from 'react';
import OneGroup from './OneGroup';
import PropTypes from 'prop-types';

class Groups extends Component {
    
  render() {
    return this.props.groups.map((group) => (
      <OneGroup key={group._id} group= {group} editGroups = {this.props.editGroups}/>
    ))
  }
}

Groups.propTypes = {
    groups: PropTypes.array.isRequired,
    editGroups: PropTypes.func.isRequired
}

export default Groups;