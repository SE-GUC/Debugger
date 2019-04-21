import React, { Component } from 'react'
import Faq from './Faq';
import CreateFaq from './CreateFaq';
import axios from 'axios';
import FaqItem from './FaqItem';


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
const id = '5ca391e3ccc32c2fbc13a97d'

export class ShowEditedFaq extends Component {
    state = {
        faqs: []
      }
    
    componentWillMount = () => {
       axios.get('http://localhost:8000/api/faq/getFaqs/' + id)
       .then(res => this.setState({faqs: res.data }))
       .catch(function(error) {
        console.log("Failed!", error);
      })
    
    }

    onChange = (e)=>{
      console.log([e.target.value])
    }

    createSlots = (s) => {
        console.log(s)
        axios.post('http://localhost:8000/api/faq//create_faq', 
        {
            id: id,
            question: s.question,
            askedBy: s.askedBy,
            noOfTimes: s.noOfTimes,
            answer: s.answer,
            answeredBy: s.answeredBy,
            date: s.date
             
        })     
    
        .then(res => this.setState({faqs: res.data}))
        .catch(function(error) {
           alert(error.message);
      })
        
    }

     editSlots =(s) => {
        console.log(s)
        axios.put('http://localhost:8000/api/faq/edit_faq/:id/', 
        {
            id:id,
            question: s.question,
            askedBy: s.askedBy,
            noOfTimes: s.noOfTimes,
            answer: s.answer,
            answeredBy: s.answeredBy,
            date: s.date
        })     
    
        .then(res => this.setState({faqs: res.data}))
            
        .catch(function(error) {
           alert(error.message);
      })
     }


  render() {
    return (
      <div>
        <CreateFaq faqscreate = {this.faqscreate}/>
        <Faq Editfaq = {this.EditfFaq} 
        Faq = {this.state.faqs} />
       
      </div>
    )
  }
}

export default ShowEditedFaq
