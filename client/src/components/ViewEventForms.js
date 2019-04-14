import React, { Component } from "react";
import axios from "axios";

export class ViewEventForms extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            eventFormsData: []
        }
    }

    componentDidMount() {
        this.eventForms();
       }
       eventForms = async () => {
        const eventForms = await axios.get("http://localhost:8000/api/eventforms");
        // console.log(eventForms.data.data);
        this.setState({ eventFormsData : eventForms.data.data }, () => console.log(this.state.eventFormsData));
        };

    render() {
        return (
            <div>
                <div>
                  <div>
                  {this.state.eventFormsData.length > 0 ?
                    <table className="table">
                      <thead />
                      <tbody>
                        <tr>
                          <td><b>Event Name</b></td>
                          <td><b>Attendee Name</b></td>
                          <td><b>Phone Number</b></td>
                          <td><b>Email</b></td>
                          <td><b>National Card Id</b></td>
                         
                        </tr>
                        {this.state.eventFormsData.map((data, i) => (
                          <tr key={i}>
                            <td>{data.event_eventName}</td>
                            <td>{data.attendeeName}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.email}</td>
                            <td>{data.nationalidCardNumber}</td>            
                          </tr>
                        ))}
                      </tbody>
                    </table>:
                    <div className="alert alert-info">
                    <strong>Info:</strong> There are no Event Forms to view
                </div> }
                  </div>
                </div>
            </div>
        )
    }
}

export default ViewEventForms;