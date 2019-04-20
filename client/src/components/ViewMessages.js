import React, { Component } from "react";
import axios from "axios";

export class ViewMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesData: []
    };
  }

  componentDidMount() {
    this.messageData();
  }
  messageData = async () => {
    const messageData = await axios.get(
      "http://localhost:8000/api/awgs/contactUs"
    );
    // console.log(messageData);
    this.setState({ messagesData: messageData.data.data }, () =>
      console.log(this.state.messagesData)
    );
  };

  render() {
    return (
      <div>
        <div>
          <div>
            {this.state.messagesData.length > 0 ? (
              <table className="table">
                <thead />
                <tbody>
                  <tr>
                    <td>
                      <b>Club Name</b>
                    </td>
                    <td>
                      <b>Name</b>
                    </td>
                    <td>
                      <b>Email</b>
                    </td>
                    <td>
                      <b>Message</b>
                    </td>
                  </tr>
                  {this.state.messagesData.map((data, i) => (
                    <tr key={i}>
                      <td>{data.clubName}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-info">
                <strong>Info:</strong> There are no Messages to view
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewMessages;
