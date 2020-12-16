import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false
  }
  render() {
    const { event } = this.props;
    return (
      <div>
        <div>{event.summary}</div>
        <div>{event.location}</div>
        <div>{event.start.dateTime}</div>
      <button className="event__Overview" onClick={()=> this.setState({showDetails: !this.state.showDetails})}>Show details</button>
      </div>
    );
  }
}
export default Event;
