import React, { Component } from 'react'
import axios from 'axios';



export class EditFaq extends Component {
    constructor(props){
        super(props);
        this.state= {
            question:"",
            askedBy:"",
            noOfTimes:"",
            answer:"",
            answeredBy:"",
            date:"",
            
            
        }
        this.handlequestion = this.handlequestion.bind(this);
        this.handleaskedBy = this.handleaskedBy.bind(this);
        this.handlenoOfTimes = this.handlenoOfTimes.bind(this);
        this.handleanswer = this.handleanswer.bind(this);
        this.handleansweredBy = this.handleansweredBy.bind(this);
        this.handledate = this.handledate.bind(this);
       
    }

    handlequestion = (event) =>{
        event.persist();
        this.setState({question: event.target.value},()=>(console.log(this.state)))
    }
    handleaskedBy=(event)=>{
        event.persist();
        this.setState({askedBy: event.target.value},()=>(console.log(this.state)))
    }
    handlenoOfTimes=(event)=>{
        event.persist();
        this.setState({noOfTimes: event.target.value},()=>(console.log(this.state)))
    }
    handleanswer= (event) =>{
        event.persist();
        this.setState({answer: event.target.value},()=>(console.log(this.state)))
    }
    handleansweredBy= (event) =>{
        event.persist();
        this.setState({answeredBy: event.target.value},()=>(console.log(this.state)))
    }
    handledate= (event) =>{
        event.persist();
        this.setState({date: event.target.value},()=>(console.log(this.state)))
    }
    
    handleEdit= async () =>{
        let methodBody = {
            question: this.state.question,
            askedBy: this.state.askedBy,
            noOfTimes:this.state.noOfTimes,
            answer:this.state.answer,
            answeredBy:this.state.answeredBy,
            date:this.state.date,
            }
        const editfaq = await axios.put("http://localhost:8000/api/faq/edit_faq",methodBody)
        console.log(editfaq.data.notes)
        if(editfaq.status === 200){
            alert("DATA HAVE BEEN CHANGED ")
        }
    }
  render() {
    return (
      <div>
       
        <span> If you want to edit a Question , Enter the Date and whome it was askedby in their fields,


             </span>
             
            <span>
               Enter your question</span>
        <input type='text' name='question' onChange={this.handlequestion}/>
        <br/>

        <span>askedBy</span>
        <input type='text' name='askedBy' onChange={this.handleaskedBy}/>
        <br/>

        <span>noOfTimes</span>
        <input type='text' name='noOfTimes' onChange={this.handlenoOfTimes}/>
        <br/>

        <span>answer</span>
        <input type='text' name='answer' onChange={this.handleanswer}/>
        <br/>

        <span>answeredBy</span>
        <input type='text' name='answeredBy' onChange={this.handleansweredBy}/>
        <br/>

        <span>date</span>
        <input type='text' name='date' onChange={this.handledate}/>
        <br/>

        <div>
            <button type="button" onClick={this.handleEdit}>
              submit
            </button>
          </div>


        </div>
        
    
    )
  }
}

export default EditFaq