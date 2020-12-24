import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });

    if (event.target.value > 0 && event.target.value < 33) {
      this.setState({
        infoText: "Select number from 1 to 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };


  render() {
    const { numberOfEvents, handleEventCount } = this.props;
    return <div>
        <ErrorAlert text={this.state.infoText} />
      <div className="numberOfEvents">
        <label className="numberOfEvents">Number of events</label>
        <input
          type="text"
          className="sum"
          value={numberOfEvents}
          onChange={handleEventCount}
        />
      </div>
    </div>
  }
}
export default NumberOfEvents;
