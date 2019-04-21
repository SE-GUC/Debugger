import React, { Component } from "react";
import axios from "axios";

export class ManageEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsData: [],
      newEventName: "",
      newEventType: "",
      newDescription: "",
      newDate: "",
      updatedEventName: "",
      updatedEventType: "",
      updatedDescription: "",
      updatedDate: ""
    };
  }

  componentDidMount() {
    this.eventData();
  }
  eventData = async () => {
    const eventData = await axios.get("http://localhost:8000/api/events");
    // console.log(eventData);
    this.setState({ eventsData: eventData.data.data }, () =>
      console.log(this.state.eventsData)
    );
  };

  onTodoChange(value) {
    this.setState({
      newEventName: value
    });
  }
  onTodoChange1(value) {
    this.setState({
      newEventType: value
    });
  }
  onTodoChange2(value) {
    this.setState({
      newDescription: value
    });
  }
  onTodoChange3(value) {
    this.setState({
      newDate: value
    });
  }
  onTodoChange4(value) {
    this.setState({
      updatedEventName: value
    });
  }
  onTodoChange5(value) {
    this.setState({
        updatedEventType: value
    });
  }
  onTodoChange6(value) {
    this.setState({
        updatedDescription: value
    });
  }
  onTodoChange7(value) {
    this.setState({
        updatedDate: value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.addEvent(
      this.state.newEventName,
      this.state.newEventType,
      this.state.newDescription,
      this.state.newDate
    );
    this.setState({
      newEventName: "",
      newEventType: "",
      newDescription: "",
      newDate: ""
    });
  };

  addEvent = async (eventName, eventType, description, date) => {
    let eventCreated = {
      eventName,
      eventType,
      description,
      date
    };
    console.log(eventCreated);

    await axios
      .post("http://localhost:8000/api/events", eventCreated)
      .then(() => {
        window.location.reload();
      });
  };

  // Delete Event
  deleteEvent = id => {
    console.log(id);
    axios.delete(`http://localhost:8000/api/events/` + id).then(() => {
      window.location.reload();
    });
  };

  // Update Event
  onUpdate = id => {
    //   console.log(id);
    this.updateEvent(
      this.state.updatedEventName,
      this.state.updatedEventType,
      this.state.updatedDescription,
      this.state.updatedDate,
      id
    );
    this.setState({
        updatedEventName: "",
        updatedEventType: "",
        updatedDescription: "",
        updatedDate: ""
    });
  };

  updateEvent = async (eventName, eventType, description, date, id) => {
    let eventUpdated = {
      eventName,
      eventType,
      description,
      date
    };
    // console.log(eventUpdated);
    // console.log(id);

    await axios
      .put("http://localhost:8000/api/events/" + id, eventUpdated)
      .then(() => {
        window.location.reload();
      });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            {this.state.eventsData.length > 0 ? (
              <table className="table">
                <thead />
                <tbody>
                  <tr>
                    <td>
                      <b>Event Name</b>
                    </td>
                    <td>
                      <b>Event Type</b>
                    </td>
                    <td>
                      <b>Description</b>
                    </td>
                    <td>
                      <b>Date</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        className="form-control"
                        name="newEventName"
                        onChange={e => this.onTodoChange(e.target.value)}
                        value={this.state.newEventName}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="newEventType"
                        onChange={e => this.onTodoChange1(e.target.value)}
                        value={this.state.newEventType}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="newDescription"
                        onChange={e => this.onTodoChange2(e.target.value)}
                        value={this.state.newDescription}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="newDate"
                        onChange={e => this.onTodoChange3(e.target.value)}
                        value={this.state.newDate}
                      />
                    </td>
                    <td>
                      <button
                        onClick={this.onSubmit}
                        className="btn btn-primary"
                      >
                        Add new Event
                      </button>
                    </td>
                  </tr>
                  {this.state.eventsData.map((data, i) => (
                    <tr key={i}>
                      <td>{data.eventName}<input className="form-control" style={{marginTop: '18px'}} onChange={e => this.onTodoChange4(e.target.value)}/></td>
                      <td>{data.eventType}<input className="form-control" style={{marginTop: '18px'}} onChange={e => this.onTodoChange5(e.target.value)}/></td>
                      <td>{data.description}<input className="form-control" style={{marginTop: '18px'}} onChange={e => this.onTodoChange6(e.target.value)}/></td>
                      <td>{data.date}<input className="form-control" style={{marginTop: '18px'}} onChange={e => this.onTodoChange7(e.target.value)}/></td>
                      <td>
                        <button
                          className="btn btn-danger" 
                          style={{display:'block', marginBottom: '5px'}}
                          onClick={this.deleteEvent.bind(this, data._id)}
                        >
                          Delete Event
                        </button>
                        <button className="btn btn-secondary" onClick={this.onUpdate.bind(this, data._id)}>Update Event</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-info">
                <strong>Info:</strong> There are no Events to view
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ManageEvents;
