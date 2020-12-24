import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false
  }
  render() {
    const { event } = this.props;
    const { showDetails } = this.state
    return (
      <div className="event">
        <div className="event__Overview">{event.summary}</div>
        {/*  */}
        <button
          className="details-btn"
          onClick={() => this.setState({ showDetails: !this.state.showDetails })}
        >
          {!showDetails ? 'Show details' : 'Hide details'}
        </button>
        {showDetails && (
          <div className='event__Details'>
            <div>{event.location}</div>
            <div>{event.start.dateTime}</div>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
