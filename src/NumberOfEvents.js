import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errMessage: ''
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
    this.props.updateEvents(null, null, value);

    if (event.target.value > 0 && event.target.value < 33) {
        this.setState({
            numberOfEvents: event.target.value,
            errMessage: ''
        })
    }
    else {
        return this.setState({
            numberOfEvents: '',
            errMessage: 'Please enter a number between 1 and 32.'
        })
    }
};


  render() {
    const { numberOfEvents } = this.props;
    return <div>
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.errMessage} />
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
