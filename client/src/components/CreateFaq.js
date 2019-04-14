import React, { Component } from 'react';
import axios from 'axios';
class CreateFaq extends Component {
  
  constructor(props) {
  super(props);
    
  this.state = {
        Faq: {
      question:"",
      askedBy: "",
      noOfTimes: null,
      answer: "",
      answeredBy: "",
      date:""
        
    }
    }
      this.handlequestion = this.handlequestion.bind(this);
      this.handleaskedby = this.handleaskedby.bind(this);
      this.handlenooftimes= this.handlenooftimes.bind(this);
      this.handleanswer= this.handleanswer.bind(this);
      this.handledate= this.handledate.bind(this);
      
    };
        
    handlequestion(event) {
      event.persist();
      this.setState({question: event.target.value},()=>(console.log(this.state)))
      };

      handleaskedby(event) {
        event.persist();
        this.setState({askedBy: event.target.value},()=>(console.log(this.state)))
        }
   
  handlenooftimes(event) {
    event.persist();
        this.setState({noOfTimes: event.target.value},()=>(console.log(this.state)))
        }
  
  handleanswer(event) {
    event.persist();
        this.setState({noOfanswerTimes: event.target.value},()=>(console.log(this.state)))
        }
handleanswerby(event){
  event.persist();
        this.setState({answeredBy: event.target.value},()=>(console.log(this.state)))
        
}
handledate(event){
  event.persist();
        this.setState({date: event.target.value},()=>(console.log(this.state)))
        
}

  handlecreate=async () =>{
    let methodBody = {question: this.state.question,askedBy:this.state.askedBy,noOfTimes:this.state.noOfTimes,answer:this.state.answer,answeredBy:this.state.answeredBy,date:this.state.date}
    const faq= await axios.post('http://localhost:8000/api/faq/create_faq',methodBody)
     console.log(faq.data)
    }

  render(){ 
    return (
      <div>
          <div>
            <p>Enter your question</p>
          </div>

          <div>
            <span>question</span>
            <input
              name="question"
              type="text"
              onChange={this.handlequestion}
            />
          </div>

          <div>
            <span>askedBy</span>
            <input
              name="askedBy"
              type="text"
              onChange={this.handleaskedby}
            />
          </div>

          <div>
            <span>  noOfTimes </span>
            <input name="noOfTimes" type="int" onChange={this.handlenooftimes} />
          </div>

          <div>
            <span>answer</span>
            <input
              name="answer"
              type="text"
              onChange={this.handleanswer}
            />
          </div>

          <div>
            <span>date</span>
            <input
              name="date"
              type="text"
              onChange={this.handledate}
            />
          </div>

          <div>
            <button type="button" onClick={this.handlecreate}>
              submit
            </button>
          </div>
        
      </div>
    );
  }




  }
  
export default CreateFaq;
