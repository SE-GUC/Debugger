import React, { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export class CheckBox extends Component {
  render() {
    return (
      <div>
        <input
          className="form-check-label"
          type="checkbox"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <span style={style}>{this.props.text}</span>
      </div>
    );
  }
}

const style={
    marginLeft:"3%"
}

export default CheckBox;
