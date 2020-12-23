import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });

    if (value < 1) {
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
    const { numberOfEvents } = this.state;
    return <div>

      <div className="NumberOfEvents">
        <label className="numberOfEvents">Number of events</label>
        <input
          type="text"
          className="sum"
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        />

      </div>
    </div>
  }
}
export default NumberOfEvents;
