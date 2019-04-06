import React, { Component } from 'react'

export class AppForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    alert('The value is: ' + this.input.value);
    const applicant = []
    applicant.push(this.input.value)
    console.log(applicant)
    console.log(e)
    console.log(e.preventDefault())
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <br/>
        <label>
          User Type:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <br/>
        <label>
          ll:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AppForm
