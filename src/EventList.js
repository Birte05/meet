import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  state = {
    events: [],
    numberOfEvents: 32,
  }

  // handleEventCount = (event) => {
  //   const value = event.target.value;
  //   this.setState({ numberOfEvents: value });
  // };

  render() {
    const { events } = this.props;
    let renderedEvents = events.slice(0, this.state.numberOfEvents)

    return (
      <div>
        <ul className="EventList">
          {renderedEvents.map(event =>
            <li key={event.id}>
              <Event event={event} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default EventList;
