import React, { Component } from "react";

class Event extends Component {
  render() {
    const { event } = this.props;
    return (
      // <ul className="Event">   {/* or is className EventList here? */}
      //   {events.map(event =>
      //     <li>
      //       <Event event={event} />
      //     </li>
      //   )}
      // </ul>
      <div>
        {event.summary}
      </div>
    );
  }
}
export default Event;