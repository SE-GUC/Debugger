import React, { Component } from "react";
import axios from "axios";

export class ViewEvents extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            eventsData: [],
            newEventName: '',
            newEventType: '',
            newDescription: '',
        }
    }

    componentDidMount() {
        this.eventData();
       }
       eventData = async () => {
        const eventData = await axios.get("http://localhost:8000/api/events");
        // console.log(eventData);
        this.setState({ eventsData : eventData.data.data }, () => console.log(this.state.eventsData));
        };

        onTodoChange(value){
            this.setState({
                newEventName: value
            });
        }
        onTodoChange1(value){
            this.setState({
                newEventType: value
            });
        }
        onTodoChange2(value){
            this.setState({
                newDescription: value
            });
        }

        onSubmit = (e) => {
            e.preventDefault();
            this.addEvent(this.state.newEventName, this.state.newEventType, this.state.newDescription);
            this.setState({  newEventName: '',  newEventType: '', newDescription : ''});
          }

          addEvent = (eventName, eventType, description) => {
            axios.post("http://localhost:8000/api/events", {
                eventName,
                eventType,
                description
            })
        }

          // Delete Todo
            deleteEvent = (id) => {
            console.log(id);
            // axios.delete(`http://localhost:8000/api/events/${id}`)
            // .then(res => this.setState({ eventsData: [...this.state.eventsData.filter(event => event.id !== id)] }));
            this.setState({ eventsData: [...this.state.eventsData.filter(event => event._id !== id)] })
  }
        

        render() {
            return (
                <div>
                <div>
                  <div>
                  {this.state.eventsData.length > 0 ?
                    <table className="table">
                      <thead />
                      <tbody>
                        <tr>
                          <td><b>Event Name</b></td>
                          <td><b>Event Type</b></td>
                          <td><b>Description</b></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" name="newEventName" onChange={e => this.onTodoChange(e.target.value)} value={this.state.newEventName}/></td>
                            <td><input className="form-control" name="newEventType" onChange={e => this.onTodoChange1(e.target.value)} value={this.state.newEventType}/></td>
                            <td><input className="form-control" name="newDescription" onChange={e => this.onTodoChange2(e.target.value)} value={this.state.newDescription}/></td>
                            <td><button onClick={this.onSubmit} className="btn btn-primary">Add new Event</button></td>
                        </tr>
                        {this.state.eventsData.map((data, i) => (
                          <tr key={i}>
                            <td>{data.eventName}</td>
                            <td>{data.eventType}</td>
                            <td>{data.description}</td>
                            <td><button className="btn btn-danger" onClick={this.deleteEvent.bind(this, data._id)} >Delete Event</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>:
                    <div className="alert alert-info">
                    <strong>Info:</strong> There are no Events to view
                </div> }
                  </div>
                </div>
            </div>
            )
        }
}

export default ViewEvents;