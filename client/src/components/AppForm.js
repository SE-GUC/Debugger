import React, { Component } from "react";
import axios from 'axios'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


export class AppForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      applicant: {
        email: "",
        userType: "",
        clubCommittee: "",
        hobbies: "",
        VGSYear: null,
        appliedPosition: ""
      }
      
      //errors: {}
    };
    this.handleApplicant = this.handleApplicant.bind(this);
    this.logApplicant = this.logApplicant.bind(this);
  }
  
  // handleErrors = () =>{
    //   const errors = {}
    //   if(this.applicant.email.trim() === '')
    //     errors.email= 'Email is required'
    //   return Object.keys(errors).length === 0 ? null : errors
    // }
    
    async componentDidMount() {
      const AppForms = await axios.get('http://localhost:8000/api/VGS/application_forms_view');
      console.log(AppForms.data)
    }

  handleApplicant(event) {
    event.persist();
    // const error = this.handleErrors();
    // this.setState({error});
    // if(error) return


    var name = event.target.name;
    // var applicantState= this.state.applicant;
    // applicantState[name]= event.target.value;
    this.setState(previousState => {
      previousState.applicant[name] = event.target.value;
      return previousState;
    });
    // console.log( this.state.applicant);
  }

  handleSubmit= async ()=>{
    const SubmittedApp = await axios.post('http://localhost:8000/api/VGS/application_form',this.state.applicant)
    console.log(SubmittedApp)
    //<div className="alert alert-success">Submitted</div>
  }

  logApplicant() {
    console.log(this.state.applicant);
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <span className="badge badge-primary m-2">Email</span>
            {/* <input name="email" type="text" onChange={(e)=>{this.handleApplicant(e)}} /> */}
            {/* <input name="email" type="text" onChange={this.handleApplicant} /> */}
            <input name="email" type="text" onChange={this.handleApplicant} />
          </div>

          <div>
            <span>User Type</span>
            <input
              name="userType"
              type="text"
              onChange={this.handleApplicant}
            />
          </div>

          <div>
            <span>Committee</span>
            <input
              name="clubCommittee"
              type="text"
              onChange={this.handleApplicant}
            />
          </div>

          <div>
            <span>Hobbies</span>
            <input name="hobbies" type="text" onChange={this.handleApplicant} />
          </div>

          <div>
            <span>VGS Year</span>
            <input
              name="VGSYear"
              type="number"
              onChange={this.handleApplicant}
            />
          </div>

          <div>
            <span>Applied Position</span>
            <input
              name="appliedPosition"
              type="text"
              onChange={this.handleApplicant}
            />
          </div>

          <div>
            <button type="button" onClick={this.logApplicant}>
              show me applicant object
            </button>
          </div>
          {/* {this.state.errors && (
            <div className="alert.alert-dange">{this.state.errors}</div>
          )} */}
          <div>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
export default AppForm;
