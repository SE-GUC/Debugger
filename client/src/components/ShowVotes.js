import React, { Component } from "react";
import axios from 'axios'

export class ShowVotes extends Component {
  async componentDidMount() {
    const AppForms = await axios.get("http://localhost:8000/api/raise_vote/application_forms_view");
    console.log(AppForms.data);
  }
  render() {
    return(
        <div>   
            this.componentDidMount
        </div>
    )
  }
}

export default ShowVotes;
