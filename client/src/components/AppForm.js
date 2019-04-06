import React, { Component } from "react";

export class AppForm extends Component {

  constructor(props){
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
    };
    this.handleApplicant=this.handleApplicant.bind(this);
    this.logApplicatnt=this.logApplicatnt.bind(this);
  }

  handleApplicant(event){
    event.persist()

    //   console.log('hi')
    // this.setState({
    //   applicant: {
    //     email: event.target.value,
    //     userType: event.target.value,
    //     clubCommittee: event.target.value,
    //     hobbies: event.target.value,
    //     VGSYear: event.target.value,
    //     appliedPosition: event.target.value
    //   }
    // });
    // console.log( this.state.applicant);

    var name = event.target.name;

    // var applicantState= this.state.applicant;
    // applicantState[name]= event.target.value;
    this.setState((previousState)=>{
      previousState.applicant[name]=event.target.value;
      return previousState;
  });
   // console.log( this.state.applicant);
}

logApplicatnt(){
   console.log( this.state.applicant);
}
  render() {
    return (
      <div>
        <div>
          <span className="badge badge-primary m-2">Email</span>
          {/* <input name="email" type="text" onChange={(e)=>{this.handleApplicant(e)}} /> */}'
          {/* <input name="email" type="text" onChange={this.handleApplicant} /> */}
          <input name="email" type="text" onChange={this.handleApplicant} />
        </div>
        <div>
          <span>User Type</span>
          <input name="userType" type="text" onChange={this.handleApplicant} />
        </div>

      {/*  <div>
          <span>Committee</span>
          <input type="text" onChange={this.handleApplicant} />
        </div>
         <div>
          <span>Hobbies</span>
          <input type="text" onChange={this.handleApplicant} />
        </div>
        <div>
          <span>VGS Year</span>
          <input type="number" onChange={this.handleApplicant} />
        </div>
        <div>
          <span>Applied Position</span>
          <input type="text" onChange={this.handleApplicant} />
        </div> */}

        <div>
          <button onClick={this.logApplicatnt}>show me applicant object</button>
        </div>
      </div>
    );
  }
}

export default AppForm;
