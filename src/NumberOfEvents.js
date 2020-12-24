import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errMessage: ''
  };

  handleInputChanged = (event) => {
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
    this.props.updateEvents('', event.target.value);
};


  render() {
    const { numberOfEvents, handleEventCount } = this.props;
    return <div>
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.infoText} />
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
