import React, { Component } from "react";
import axios from "axios";

export class ViewEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsData: [],
      newEventName: "",
      newEventType: "",
      newDescription: "",
      newDate: ""
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

  // Delete Todo
  deleteEvent = id => {
    console.log(id);
    axios.delete(`http://localhost:8000/api/events/` + id).then(() => {
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
                      <td>{data.eventName}</td>
                      <td>{data.eventType}</td>
                      <td>{data.description}</td>
                      <td>{data.date}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={this.deleteEvent.bind(this, data._id)}
                        >
                          Delete Event
                        </button>
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

export default ViewEvents;
