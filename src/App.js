import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractEvents, extractLocations, getEvents } from "./api";
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import "./nprogress.css";
import { mockData } from "./mock-data";
import { InfoAlert } from './Alert';
import { ErrorAlert } from './Alert'


class App extends Component {
  state = {
    locations: [],
    events: [],
    numberOfEvents: 32,
    infoText: '',
    errMessage: ''
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // Task 4.4
  updateEvents = (location) => {

    //this.setState({numberOfEvents: eventCount})
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events:  locationEvents.slice(0, this.state.eventCount),

      });
    });

  }

  render() {
    return (
      <div className="App">
      <h1>List of Coding Events</h1>
      <p>Choose your nearest location</p>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="Alert" text={this.state.infoText} />
        <EventList events={this.state.events} />
        <ErrorAlert className="Alert" text={this.state.errMessage} />
      </div>
    );
  }
}

export default App;
