import React, { Component } from "react";
import axios from "axios";

export class GetFaq extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        allfaq: []
      };
  
    }



    componentDidMount() {
        this.getFaqs();
       }
       getFaqs = async () => {
        const getFaqs = await axios.get(
          "http://localhost:8000/api/faq/getFaqs"
        );


        if (getFaqs.status === 200) {
            this.setState({ allfaq: getFaqs.data }, () => console.log(this.state.allfaq));
          }
          else if(getFaqs.status ===203){
            this.setState({ allfaq: [] }, () => console.log(this.state.allfaq));
          }
        };s


        //     async updatefaq(id){
        //     let currentfaq = document.getElementById(id).value
        //     const data = {
        //       id:id,
              
        //     }
        //     const updateDate = await axios.post('http://localhost:8000/api/VGS/update/AppForm',data)
        //     if(updateDate.status === 200){
        //       this.gettingAppForms()
        //     }
        //   }



        render() {
            return (
              <div>
    
                <div className="GetFaq">
                  <div className="row">
                  {this.state.allfaq.length > 0 ?
                    <table className="table">
                      <thead />
                      <tbody>
                        <tr>
                          <td>question</td>
                          <td>askedBy</td>
                          <td>noOfTimes</td>
                          <td>answer</td>
                          <td>answeredBy</td>
                          <td>date</td>
                         
                        </tr>
                        {this.state.allfaq.map((data, i) => (
                          <tr key={i}>
                            <td>{data.question}</td>
                            <td>{data.askedBy}</td>
                            <td>{data.noOfTimes}</td>
                            <td>{data.answer}</td>
                            <td>{data.answeredBy}</td>
                            <td>{data.date}</td>
                            <td>

                            <button className="قم بالضغط ع الزر يا سكر" onClick={()=>this.updateStatus(data.id)}>Update</button></td>                    
                          </tr>
                        ))}
                      </tbody>
                    </table>:
                    <div className="alert alert-info">
                    <strong>Info:</strong> There are no questions to view
                </div> }
                  </div>
                </div>:
                 }
              </div>
            );
          }
        }
        












export default GetFaq